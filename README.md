# Node.js Files API (CRUD)

## 📌 Overview
This is a **Node.js Express API** that provides **CRUD (Create, Read, Update, Delete)** operations for managing files and folders. It uses **TypeScript**, **Express**, and **Swagger** for API documentation, and integrates with a database like **MongoDB** or **DynamoDB**.

## 🚀 Features
- **Create** files and folders
- **Read** files and directory contents
- **Update** file names and content
- **Delete** files and folders
- **Error handling** with centralized logging
- **Swagger API documentation**

---

## 🏰️ Tech Stack
- **Node.js** (v18+)
- **Express.js**
- **TypeScript**
- **Swagger (OpenAPI)**
- **AWS S3 (optional for cloud storage)**
- **DynamoDB/MongoDB (optional for metadata storage)**

---

## 🔧 Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/evillan0315/node-files-api.git
cd node-files-api
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and configure it:
```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/files-api  # Change if using DynamoDB
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

### **4️⃣ Start the Server**
#### Development Mode:
```bash
npm run dev
```
#### Production Mode:
```bash
npm start
```

---

## 📂 API Endpoints
### **1️⃣ File Operations**

#### 🔹 Create a File
```http
POST /files
```
**Request Body:**
```json
{
  "name": "example.txt",
  "content": "Hello, world!"
}
```

#### 🔹 Read a File
```http
GET /files/{filename}
```

#### 🔹 Update a File
```http
PUT /files/{filename}
```
**Request Body:**
```json
{
  "content": "Updated content here."
}
```

#### 🔹 Delete a File
```http
DELETE /files/{filename}
```

---

### **2️⃣ Folder Operations**
#### 🔹 Create a Folder
```http
POST /folders
```
**Request Body:**
```json
{
  "name": "my-folder"
}
```

#### 🔹 List Files in a Folder
```http
GET /folders/{foldername}
```

#### 🔹 Delete a Folder
```http
DELETE /folders/{foldername}
```

---

## 📝 Swagger API Documentation

To view API documentation, start the server and visit:
📌 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

Swagger is automatically generated and provides a UI to test the API.

---

## 🛠️ Project Structure
```
node-files-api/
├── src/
│   ├── routes/
│   │   ├── file.routes.ts
│   │   ├── folder.routes.ts
│   ├── controllers/
│   │   ├── file.controller.ts
│   │   ├── folder.controller.ts
│   ├── services/
│   │   ├── file.service.ts
│   │   ├── folder.service.ts
│   ├── utils/
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   ├── config/
│   │   ├── swagger.ts
│   ├── app.ts
│   ├── server.ts
├── .env
├── package.json
└── README.md
```

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to improve.

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit changes** (`git commit -m 'Add new feature'`)
4. **Push to GitHub** (`git push origin feature-branch`)
5. **Submit a Pull Request** 🚀

---

## 📞 Contact
- **GitHub**: [evillan0315](https://github.com/evillan0315)
- **Email**: evillan0315@gmail.com
- **LinkedIn**: [Eddie Villanueva](https://linkedin.com/in/evillanueva0315)


