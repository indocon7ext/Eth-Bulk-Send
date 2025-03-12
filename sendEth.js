import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Convert __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration from .env
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY;
const AMOUNT_TO_SEND = process.env.AMOUNT_TO_SEND || "0.014"; // Default to 0.014 ETH
const WALLET_FILE = "wallets.txt";

// Validate required environment variables
if (!INFURA_PROJECT_ID || !SENDER_PRIVATE_KEY) {
  console.error("❌ Missing INFURA_PROJECT_ID or SENDER_PRIVATE_KEY in .env file.");
  process.exit(1);
}

// Setup provider and wallet
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`);
const senderWallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);

// Load recipient addresses from wallets.txt
const loadWallets = (filePath) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
    return data.split("\n").map((line) => line.trim()).filter((addr) => addr);
  } catch (err) {
    console.error("❌ Error loading wallet file:", err.message);
    return [];
  }
};

const recipientAddresses = loadWallets(WALLET_FILE);

// Function to send ETH
const sendEth = async () => {
  if (recipientAddresses.length === 0) {
    console.error("❌ No valid recipient addresses found.");
    return;
  }

  console.log(`🚀 Starting ETH transfers to ${recipientAddresses.length} wallets...`);

  const amountInWei = ethers.parseEther(AMOUNT_TO_SEND);

  for (const [index, recipient] of recipientAddresses.entries()) {
    try {
      console.log(`[${new Date().toISOString()}] [${index + 1}/${recipientAddresses.length}] Sending ${AMOUNT_TO_SEND} ETH to ${recipient}...`);

      const tx = await senderWallet.sendTransaction({
        to: recipient,
        value: amountInWei,
      });

      console.log(`✔️ [${new Date().toISOString()}] Transaction sent: ${tx.hash}`);
      await tx.wait(); // Wait for confirmation
      console.log(`✅ [${new Date().toISOString()}] Transaction confirmed: ${tx.hash}\n`);
    } catch (error) {
      console.error(`❌ [${new Date().toISOString()}] Failed to send ETH to ${recipient}:`, error.message);
    }
  }

  console.log("🎉 ETH transfers completed.");
};

sendEth().catch((err) => console.error("❌ Unexpected error:", err.message));
