package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func setupGoogleOAuthConfig() *oauth2.Config {
	return &oauth2.Config{
		RedirectURL:  os.Getenv("REDIRECTURL"),
		ClientID:     os.Getenv("CLIENTID"),
		ClientSecret: os.Getenv("CLIENTSECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/drive.file"},
		Endpoint:     google.Endpoint,
	}
}

func HandleLoging(c *gin.Context) {
	googleOauthConfig := setupGoogleOAuthConfig()

	url := googleOauthConfig.AuthCodeURL(os.Getenv("OAUTHSTATESTRING"))
	c.Redirect(http.StatusTemporaryRedirect, url)
}

func HandleGoogleCallback(c *gin.Context) {
	code := c.Query("code")

	googleOauthConfig := setupGoogleOAuthConfig()

	token, err := googleOauthConfig.Exchange(c, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange token"})
		return
	}

	c.SetCookie("access_token", token.AccessToken, 3600, "/", "", false, true)

	c.Redirect(http.StatusFound, "http://localhost:5173/finalize")
}

func AuthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "You are authenticated"})
}
