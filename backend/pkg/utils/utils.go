package utils

import (
	"encoding/json"
	"io"
	"net/http"
)

// I get the request and a pointer to it and I take that in 'r'
// So, I'll be able to use 'r' to access the request I've received from the user
func ParseBody(r *http.Request, x interface{}) {
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), x); err != nil {
			return
		}
	}
}
