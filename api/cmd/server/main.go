package main

import (
    "log"
    
    "github.com/IYStoychev21/star-crown/api/internal/handlers"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file") 
    }

    router := gin.Default()

    //router.Use(authMiddleware)

    router.GET("/", handlers.IndexHandler)

    router.GET("/login", handlers.HandleLoging)
    router.GET("/auth/google/callback", handlers.HandleGoogleCallback)
    router.GET("/protected", handlers.ProtectedHandler)

    router.Run(":3000")
}

