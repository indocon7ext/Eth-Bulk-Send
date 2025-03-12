# 🚀 ETH Bulk Sender

A simple Node.js script to send **ETH Sepolia** to multiple wallet addresses securely and efficiently.

## 📌 Features
✅ Sends ETH to multiple wallets in bulk  
✅ Uses **Infura RPC** for Ethereum transactions  
✅ Loads recipient wallets from a `wallets.txt` file  
✅ Securely stores API keys & private keys using `.env`  
✅ Provides **detailed logging** for tracking transactions  

---

## 📦 Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/indocon7ext/Eth-Bulk-Send
cd Eth-Bulk-Send
```

### **2️⃣ Install Dependencies**
```sh
npm install ethers dotenv
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file and add your private key & Infura project ID:
```sh
nano .env
```
Then, add the following:
```ini
INFURA_PROJECT_ID=your_infura_project_id
SENDER_PRIVATE_KEY=your_private_key
AMOUNT_TO_SEND=0.014
```
🔴 **DO NOT SHARE YOUR PRIVATE KEY!** Keep `.env` **secret** and **do not push it to GitHub**.

### **4️⃣ Prepare Recipient Wallets**
Create a `wallets.txt` file and add **one wallet address per line**:
```
0xWallet1
0xWallet2
0xWallet3
...
```

---

## 🚀 Usage

### **Send ETH to All Wallets**
Run the script:
```sh
node sendEth.js
```

### **Example Output**
```
🚀 Starting ETH transfers to 3 wallets...
[2025-03-12T10:00:00.123Z] [1/3] Sending 0.014 ETH to 0xWallet1...
✔️  [2025-03-12T10:00:02.456Z] Transaction sent: 0xTxHash1
✅ [2025-03-12T10:00:10.789Z] Transaction confirmed: 0xTxHash1

[2025-03-12T10:00:11.123Z] [2/3] Sending 0.014 ETH to 0xWallet2...
✔️  [2025-03-12T10:00:12.456Z] Transaction sent: 0xTxHash2
✅ [2025-03-12T10:00:20.789Z] Transaction confirmed: 0xTxHash2
...
🎉 ETH transfers completed.
```

---

## 🔒 Security
- **Never expose your private key** in public repositories. Always use a `.env` file.
- Add `.env` to `.gitignore` to **prevent accidental leaks**:
  ```
  # Ignore .env file (security)
  .env
  ```
- Use a **separate wallet** with a limited balance for security.

---

## 📜 License
None

---

### **🔗 Contribute**
Feel free to submit a pull request or open an issue if you find bugs or want to improve this script!

---

### **🙌 Credits**
Created by **[Fathir Ibrahim](https://github.com/indocon7ext)**.
