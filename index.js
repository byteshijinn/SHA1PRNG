var crypto = require('crypto');
module.exports = SHA1PRNG;

function SHA1PRNG(seed) {
	var sha = crypto.createHash('sha1'),
		btLength = 16,
		bt = new Buffer(btLength),
		index = 0,
		DIGEST_SIZE = 20,
		output = "",
		remCount = 0;

	sha.update(seed);
	var state = sha.digest('buffer');

	var updateState = function(state, output) {
		var last = 1;
		var v = 0;
		var t = 0;
		var zf = false;
		// state(n + 1) = (state(n) + output(n) + 1) % 2^160;
		for (var i = 0; i < state.length; i++) {
			// Add two bytes
			v = getInt8(state[i]) + getInt8(output[i]) + last;
			// Result is lower 8 bits
			t = v & 255;
			// Store result. Check for state collision.
			zf = zf | (state[i] != t);
			state[i] = t;
			// High 8 bits are carry. Store for next iteration.
			last = v >> 8;
		}

		// Make sure at least one bit changes!
		if (!zf)
			state[0]++;
		return state;
	}

	var getInt8 = function(num) {
		if (num > 127) {
			return num - 256;
		}
		return num;
	}
	while (index < btLength) {
		sha = crypto.createHash('sha1');
		sha.update(state);
		output = sha.digest('buffer');
		state = updateState(state, output);
		todo = (btLength - index) > DIGEST_SIZE ?
				DIGEST_SIZE : btLength - index;
		// Copy the bytes, zero the buffer
		for (var i = 0; i < todo; i++) {
			bt[index++] = output[i];
			output[i] = 0;
		}
		remCount += todo;
	}

	// Store remainder for next time
	remainder = output;
	remCount %= DIGEST_SIZE;
	return bt;
}
