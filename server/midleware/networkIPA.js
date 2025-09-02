const checkNetworkIPA = async (req, res) => {
  const clientIp = req.clientIp; // more reliable than req.ip with proxies
  // const allowedRangeStart = "103.203.72.0";
  // const allowedRangeEnd = "103.203.72.255";
  const ip =
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress || '';
  console.log('yourIp: ', clientIp);
  console.log('req.Ip: ', req.ip);
  console.log('Ip: ___', req.socket.remoteAddress);
  // simple check: if IP starts with "103.203.72."
  const allowed = clientIp && clientIp.startsWith("103.203.72.");
  res.json({
    yourIp: clientIp,
    allowed,
    message: allowed ? "✅ Access granted: You are whitelisted" : "🚫 Access denied: Your IP is not whitelisted",
  });
}

module.exports = checkNetworkIPA