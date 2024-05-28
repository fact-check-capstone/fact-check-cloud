# Gunakan image Node.js yang sesuai
FROM node:20

# Set work directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi ke dalam container
COPY . .

# Generate Prisma Client
RUN npx prisma generate
# RUN npx prisma db push

# Expose port yang digunakan aplikasi
EXPOSE 5000

# Jalankan aplikasi
CMD [ "node", "src/index.js" ]
