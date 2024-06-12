# Preidict API Spec

## Create Preidict

Endpoint : POST /predict/:userId

Headers :

- Content-Type: application/json

Request Body :

```json
{
  "text": "Presiden mengumumkan program vaksinasi massal mulai minggu depan"
}
```

Response Body

```json
{
  "status": "success",
  "data": {
    "prediction": "hoax"
  }
}
```

## Get Predict History

Endpoint : GET /predict/:userId

Headers :

- Content-Type: application/json

Response Body

```json
{
  "message": "berhasil",
  "data": [
    {
      "id": "842262bd-c6a0-4324-b4eb-5373ec1b52e9",
      "result": "fact",
      "text": "aku presiden",
      "userId": "2"
    },
    {
      "id": "e3b1dd8c-0ad4-430e-8fe6-66fd9be91046",
      "result": "fact",
      "text": "a",
      "userId": "2"
    },
    {
      "id": "ea400345-e63e-41fa-bb82-67befbeb3b8c",
      "result": "fact",
      "text": "a",
      "userId": "2"
    },
    {
      "id": "eb80b3b6-c10b-4c2a-87ae-3c92f41fc1da",
      "result": "fact",
      "text": "Berita palsu tentang chip mikro di vaksin COVID-19 menyebar luas",
      "userId": "2"
    }
  ]
}
```

## Delete Predict History

Endpoint : DELETE /predict/:predictId

Response Body

```json
{
  "message": "Prediksi berhasil dihapus"
}
```

## Get News

Endpoint : GET /news

Headers :

- Content-Type: application/json

Response Body

```json
{
  "data": [
    {
      "id": 1,
      "image_url": "https://placeimage.com/avatar",
      "title": "judul berita",
      "content": "Presiden mengumumkan program vaksinasi massal mulai minggu depan",
      "link": "https:blabvlabas.cpo",
      "createdAt": "12-12-2024",
      "updatedAt": "12-12-2024"
    }
  ]
}
```
