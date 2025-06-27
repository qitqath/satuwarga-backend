FROM node:current

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan layer caching Docker
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin sisa kode aplikasi ke dalam direktori kerja
COPY . .

# Buka port yang digunakan oleh layanan ini di dalam container
EXPOSE 5002

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["node", "index.js"]