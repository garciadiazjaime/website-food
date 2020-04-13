function getPhoneNumber(phone) {
  const areaCode = phone.length >= 10 ? `(${phone.substr(0, 3)})` : '';
  const first3 = phone.substr(-7, 3);
  const last4 = phone.substr(-4);
  
  return `${areaCode}${first3}-${last4}`
}

exports.getPhoneNumber = getPhoneNumber;
