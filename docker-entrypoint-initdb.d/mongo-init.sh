#!/bin/bash

# Подключаемся к MongoDB и проверяем успешность подключения
mongosh --username root --password example --authenticationDatabase admin <<EOF

// Переключаемся на базу данных admin для создания пользователя
use admin

// Создаем пользователя student с правами на базу weblarek
db.createUser({
  user: "student",
  pwd: "password",
  roles: [
    { role: "readWrite", db: "weblarek" },
    { role: "dbAdmin", db: "weblarek" }  // Добавляем права администратора
  ]
})

// Переключаемся на базу данных weblarek
use weblarek

// Создаем коллекции
db.createCollection("counters")
db.createCollection("orders")
db.createCollection("products")
db.createCollection("users")

// Загружаем и обрабатываем данные
const productsData = JSON.parse(require("fs").readFileSync("/docker-entrypoint-initdb.d/weblarek.products.json"))
db.products.insertMany(productsData)
EOF
