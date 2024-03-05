let answer = 0;

function formula(i) {
	return ((5*i) - 2)*(i+3);
}

for(let i = 1; i <= 50; i++)
	answer += formula(i)

console.log(answer);