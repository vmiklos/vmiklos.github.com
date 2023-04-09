from constraint import Problem, AllDifferentConstraint

problem = Problem()

# Define the variables: 11; ... ; 71,72,73,74,75,76,77 ranging in 1..7.
for i in range(1, 8):
	problem.addVariables(range(i*10+1, i*10+i+1), range(1, 8))

# Each chain has different values, but there is no logic in the chain layout.
problem.addConstraint(AllDifferentConstraint(), [21,32,43,53,65,76,77])
problem.addConstraint(AllDifferentConstraint(), [44,55,64,63,74,75,66])
problem.addConstraint(AllDifferentConstraint(), [11,22,31,41,52,62,73])
problem.addConstraint(AllDifferentConstraint(), [33,54,42,51,61,72,71])

# Each horizontal line has different values.
for i in range(2, 8):
	# 21,22; ... ; 71,72,73,74,75,76,77
	problem.addConstraint(AllDifferentConstraint(), [i*10+j for j in range(1, i+1)])

# Same for diagonal lines.
for i in range(1, 7):
	# 11,21,31,41,51,61,71; ... ; 66,76
	problem.addConstraint(AllDifferentConstraint(), [j*10+i for j in range(i, 8)])
	# 11,22,33,44,55,66,77; ... ; 61,72
	problem.addConstraint(AllDifferentConstraint(), [(i+j-1)*10+j for j in range(1, 9-i)])

# Some value is given.
initValue = [[0],
	     [0,0],
	     [7,5,3],
	     [0,0,0,0],
	     [1,0,0,0,6],
	     [0,6,0,0,4,0],
	     [0,0,5,0,3,0,0]]
for i in range(1, 8):
	for j in range(1, i+1):
		if initValue[i-1][j-1] != 0:
			problem.addConstraint(lambda var, val=initValue[i-1][j-1]:
					var==val, [i*10+j])

# Get and print the solutions.
for solution in problem.getSolutions():
	for i in range(1, 8):
		for j in range(1, i+1):
			print solution[i*10+j],
		print
	print
