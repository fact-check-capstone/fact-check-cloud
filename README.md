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
    "message": "berhasil",
    "data": {
        "userId": "1",
        "text": "Presiden mengumumkan program vaksinasi massal mulai minggu depan",
        "result": "Tidak terindikasi hoax",
        "createdAt": "2024-06-13T15:33:18.060Z",
        "updatedAt": "2024-06-13T15:33:18.060Z"
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
            "id": "1f134c62-5e56-468a-a5c5-c3abad6b6ff1",
            "result": "fact",
            "createdAt": "2024-06-13T12:31:58.932Z",
            "text": "agat ganteng",
            "userId": "1",
            "updatedAt": "2024-06-13T12:31:58.932Z"
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
    "message": "berhasil",
    "data": [
        {
            "id": 1,
            "title": "Agat Wong Dermayu",
            "image_url": "https://aaa.com/aa.png",
            "content": "Agat wong dermayu cuy ...",
            "link": "https://aaa.com/agat.html",
            "createdAt": "2024-06-13T15:45:06.000Z",
            "updatedAt": "2024-06-13T15:45:06.000Z"
        }
    ]
}
```

## Scrape Latest News

Endpoint : GET /news?refresh=ok

Headers :

- Content-Type: application/json

Response Body

```json
{
    "message": "berhasil",
    "data": [
        {
            "id": 1,
            "title": "Agat Wong Dermayu",
            "image_url": "https://aaa.com/aa.png",
            "content": "Agat wong dermayu cuy ...",
            "link": "https://aaa.com/agat.html",
            "createdAt": "2024-06-13T15:45:06.000Z",
            "updatedAt": "2024-06-13T15:45:06.000Z"
        }
    ]
}
```
