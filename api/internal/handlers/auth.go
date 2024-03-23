package handlers

import (
	"encoding/json"
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
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/userinfo.profile"},
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

	c.Redirect(http.StatusFound, "http://localhost:5173/library")
}

type User struct {
	UserName string `json:"name"`
	FirsName string `json:"given_name"`
	LastName string `json:"family_name"`
	Picture  string `json:"picture"`
	Email    string `json:"email"`
}

func UserHandler(c *gin.Context) {
	token, err := c.Cookie("access_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user info"})
		return
	}

	defer resp.Body.Close()

	var user User
	err = json.NewDecoder(resp.Body).Decode(&user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode user info"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"name":  user.UserName,
		"first": user.FirsName,
		"last":  user.LastName,
		"pic":   user.Picture,
		"email": user.Email,
	})
}
