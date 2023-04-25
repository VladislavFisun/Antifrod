module.exports = function(originalFunction, timeInterval, maxRequests) {
    const requests = {};
  
    return function(ip, timestamp, ...args) {
      if (!requests[ip]) {
        requests[ip] = [timestamp];
      } else {
        const validRequests = requests[ip].filter((time) => timestamp - time <= timeInterval);
        if (validRequests.length >= maxRequests) {
          console.log(`IP ${ip} заблокирован`);
          return;
        } else {
          validRequests.push(timestamp);
          requests[ip] = validRequests;
        }
      }
  
      originalFunction(...args);
    }
  }