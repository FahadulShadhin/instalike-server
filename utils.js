const setClauses = (key, val, clauses, values, counter) => {
	if (key) {
		clauses.push(`${key} = $${counter}`);
		values.push(val);
	}
};

module.exports = { setClauses };
