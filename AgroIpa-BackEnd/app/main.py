from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import seeds_routes, auth_routes

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(seeds_routes.router, prefix="/api/v1", tags=["seeds"])
app.include_router(auth_routes.router, prefix="/api/v1", tags=["auth"])


@app.get("/health")
def health_check():
    return {"status": "ok"}