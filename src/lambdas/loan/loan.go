package loan

import (
	"math"
	"time"
)

// Input - loan input struct
type Input struct {
	Amount    float64   `json:"amount"`
	Procedure string    `json:"procedure"`
	Start     time.Time `json:"start"`
	Term      int       `json:"term"`
	Rate      float64   `json:"rate"`
}

// Output - loan output struct
type Output struct {
	Schedule      []monthlyOutput `json:"schedule"`
	TotalInterest float64         `json:"totalInterest"`
	TotalPayments float64         `json:"totalPayments"`
}

type monthlyOutput struct {
	Interest  float64 `json:"interest"`
	Principal float64 `json:"principal"`
	Balance   float64 `json:"balance"`
	Payment   float64 `json:"payment"`
}

// Calculate loan func
func Calculate(i Input) Output {
	output := make(chan Output)

	if i.Procedure == "A" {
		go calculateEvenTotal(i, output)
	} else {
		go calculateEvenPrincipal(i, output)
	}

	return <-output
}

func calculateEvenTotal(i Input, ch chan<- Output) {
	monthlyInterestRate := i.Rate / 12 / 100
	payment := i.Amount * (monthlyInterestRate + monthlyInterestRate/(math.Pow((1+monthlyInterestRate), float64(i.Term))-1))
	schedule := calculateEvenTotalSchedule(i, monthlyInterestRate, payment)
	totalInterest := calculateTotalFees(schedule)
	ch <- Output{schedule, totalInterest, i.Amount + totalInterest}
}

func calculateEvenPrincipal(i Input, ch chan<- Output) {
	schedule := calculateEvenPrincipalSchedule(i)
	totalInterest := calculateTotalFees(schedule)
	ch <- Output{schedule, totalInterest, i.Amount + totalInterest}
}

func calculateEvenTotalSchedule(input Input, monthlyInterestRate float64, payment float64) []monthlyOutput {
	var s []monthlyOutput
	amount := input.Amount
	for i := 0; i < input.Term; i++ {
		interest := amount * monthlyInterestRate
		principal := payment - interest
		balance := amount - principal
		s = append(s, monthlyOutput{interest, principal, map[bool]float64{true: balance, false: 0}[balance > 0], payment})
		amount = balance
	}

	return s
}

func calculateEvenPrincipalSchedule(input Input) []monthlyOutput {
	var s []monthlyOutput
	amount := input.Amount
	principal := amount / float64(input.Term)
	for i := 0; i < input.Term; i++ {
		interest := amount * input.Rate / (100 * 12)
		payment := principal + interest
		balance := amount - principal
		s = append(s, monthlyOutput{interest, principal, map[bool]float64{true: balance, false: 0}[balance > 0], payment})
		amount = balance
	}

	return s
}

func calculateTotalFees(s []monthlyOutput) float64 {
	var total float64
	for _, mo := range s {
		total += mo.Interest
	}

	return total
}
