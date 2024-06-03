# Preidict API Spec

## Create Preidict

Endpoint : POST /predict

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
  "data": [
    {
      "id": 1,
      "userId": "2105001",
      "prediction": "facta",
      "text": "Presiden mengumumkan program vaksinasi massal mulai minggu depan",
      "createdAt": "12-12-2024",
      "updatedAt": "12-12-2024"
    }
  ]
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
      "createdAt": "12-12-2024",
      "updatedAt": "12-12-2024"
    }
  ]
}
```
