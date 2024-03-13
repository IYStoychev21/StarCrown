
package handlers

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func IndexHandler(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "message": "Hello, World!",
    })
}
