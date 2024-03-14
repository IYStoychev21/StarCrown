package main

import (
	"log"
	"net/http"

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

	router.GET("/", handlers.IndexHandler)

	router.GET("/login", handlers.HandleLoging)
	router.GET("/auth/google/callback", handlers.HandleGoogleCallback)
	router.GET("/protected", authMiddleware, handlers.ProtectedHandler)

	router.Run(":3000")
}

func authMiddleware(c *gin.Context) {
	_, err := c.Request.Cookie("access_token")

	if err != nil {
		c.Redirect(http.StatusFound, "/login")
		c.Abort()
		return
	}

	c.Next()
}
