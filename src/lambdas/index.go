package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/prplx/finance/lambdas/loan"
)

// Handler - check routing and call correct methods
func Handler(w http.ResponseWriter, r *http.Request) {
	router := chi.NewRouter()

	router.Get("/api/health", healthCheckHandler)
	router.Post("/api/loan", loanHandler)
	router.ServeHTTP(w, r)
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func loanHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var input loan.Input
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil && err != io.EOF {
		panic(err)
	}
	json.NewEncoder(w).Encode(loan.Calculate(input))
}
