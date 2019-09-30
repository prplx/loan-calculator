package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/prplx/calcs/lambdas/loan"
)

// Handler - check routing and call correct methods
func Handler(w http.ResponseWriter, r *http.Request) {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api").
		Subrouter()

	subrouter.HandleFunc("/health", healthCheckHandler).Methods(http.MethodGet)
	subrouter.HandleFunc("/loan", loanHandler).Methods(http.MethodPost, http.MethodOptions)
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
