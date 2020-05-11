package main

import (
	"errors"
	"sort"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var (
	// DefaultHTTPGetAddress Default Address
	//DefaultHTTPGetAddress = "https://checkip.amazonaws.com"

	// ErrNoIP No IP found in response
	Zero = errors.New("User cannot enter 0 or 1 for pairs")

	// ErrNon200Response non 200 status code in response
	NaNumber = errors.New("User must enter a valid number for pairs")

	Large = errors.New("Pairs is too large (32 max)")
)

// This funtion returns the median factor of a number
func genBoard(size int) []int {
	var factors []int
	var optimal []int

	// loop through to find nontrivial factors (though all will be divisible by 2, see main)
	for i := 2; i <= size; i++ {
		if size%i == 0 {
			factors = append(factors, i)
		}
	}
	//fmt.Printf("Factors of %d: %v\n", size, factors)

	optimal = append(optimal, factors[len(factors)/2-1])
	optimal = append(optimal, size/optimal[0])

	sort.Ints(optimal)

	return optimal
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	// Set number of pairs
	pairs, _ := strconv.Atoi(request.QueryStringParameters["pairs"])

	// error check
	if pairs < 2 {
		return events.APIGatewayProxyResponse{}, Zero
	}
	if pairs > 32 {
		return events.APIGatewayProxyResponse{}, Large
	}

	// nested if because I was getting weird go syntax errors
	if !(pairs > 1 && pairs < 33) {
		return events.APIGatewayProxyResponse{}, NaNumber
	}
	//head1 := map[string]bool{"Access-Control-Allow-Credentials": true}

	// find a good factor to make a board
	bestFactors := genBoard(pairs * 2)
	// report findings (factors to make most square-like board)
	// returns height in body
	return events.APIGatewayProxyResponse{
		Body:       strconv.Itoa(bestFactors[0]),
		StatusCode: 200,
	}, nil

}

func main() {
	lambda.Start(handler)
}
