from fastapi import APIRouter
from .auth_routes import router as auth_router
from .seeds_routes import router as seeds_router

api_v1_router = APIRouter()
api_v1_router.include_router(auth_router, tags=["auth"])
api_v1_router.include_router(seeds_router, tags=["seeds"])