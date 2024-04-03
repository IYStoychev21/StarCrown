package main

import (
	"log"
	"net/http"

	"github.com/IYStoychev21/star-crown/api/internal/handlers"
	"github.com/IYStoychev21/star-crown/api/internal/steam"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://tauri.localhost", "http://localhost:28027"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60,
	}))

	router.GET("/", handlers.IndexHandler)

	router.GET("/login", handlers.HandleLoging)
	router.GET("/auth/google/callback", handlers.HandleGoogleCallback)

	router.GET("/user", authMiddleware, handlers.UserHandler)
	router.GET("/games", authMiddleware, steam.GetSteamGames)
	router.GET("/games/:appid", authMiddleware, steam.GetGameInfo)
	router.GET("/logout", authMiddleware, handlers.LogOut)
	router.GET("refresh-token", authMiddleware, handlers.RefreshToken)

	router.Run()
}

func authMiddleware(c *gin.Context) {
	auth := c.Request.Header.Get("Authorization")

	if auth == " " {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	c.Next()
}
