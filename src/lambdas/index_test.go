package api

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealth(t *testing.T) {
	expected := `{"ok":true}`
	testEndpoint("GET", "/api/health", "", expected, healthCheckHandler, t)
}

func TestLoan(t *testing.T) {
	input := `{"data": "invalid"}`
	expected := `{"schedule":null,"totalInterest":0,"totalPayments":0}`
	testEndpoint("POST", "/api/loan", input, expected, loanHandler, t)

	input2 := `{"amount": 1000, "procedure": "A", "rate": 10, "start": "2019-10-02T20:22:22.531Z", "term": 12}`
	expected2 := `{"schedule":[{"interest":8.333333333333334,"principal":79.58255389667657,"balance":920.4174461033234,"payment":87.9158872300099},{"interest":7.670145384194361,"principal":80.24574184581554,"balance":840.1717042575078,"payment":87.9158872300099},{"interest":7.001430868812565,"principal":80.91445636119734,"balance":759.2572478963104,"payment":87.9158872300099},{"interest":6.327143732469254,"principal":81.58874349754065,"balance":677.6685043987698,"payment":87.9158872300099},{"interest":5.647237536656415,"principal":82.26864969335348,"balance":595.3998547054163,"payment":87.9158872300099},{"interest":4.961665455878469,"principal":82.95422177413143,"balance":512.4456329312849,"payment":87.9158872300099},{"interest":4.270380274427374,"principal":83.64550695558253,"balance":428.8001259757024,"payment":87.9158872300099},{"interest":3.573334383130853,"principal":84.34255284687904,"balance":344.45757312882336,"payment":87.9158872300099},{"interest":2.870479776073528,"principal":85.04540745393638,"balance":259.412165674887,"payment":87.9158872300099},{"interest":2.1617680472907246,"principal":85.75411918271918,"balance":173.65804649216778,"payment":87.9158872300099},{"interest":1.4471503874347316,"principal":86.46873684257517,"balance":87.18930964959262,"payment":87.9158872300099},{"interest":0.7265775804132718,"principal":87.18930964959662,"balance":0,"payment":87.9158872300099}],"totalInterest":54.99064676011488,"totalPayments":1054.990646760115}`
	testEndpoint("POST", "/api/loan", input2, expected2, loanHandler, t)
}

func testEndpoint(method string, path string, input string, expected string, h func(http.ResponseWriter, *http.Request), t *testing.T) {
	req, _ := http.NewRequest(method, path, bytes.NewBuffer([]byte(input)))
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(h)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	if strings.TrimSuffix(rr.Body.String(), "\n") != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
