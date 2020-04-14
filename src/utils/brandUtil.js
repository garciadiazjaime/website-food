const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana']

function getTitle(brand) {
  if (brand.location && !blackListLocations.includes(brand.location.name)) {
    return brand.location.name
  }

  return brand.fullName || brand.username
}

function getPhoneNumber(phone) {
  const areaCode = phone.length >= 10 ? `(${phone.substr(0, 3)})` : '';
  const first3 = phone.substr(-7, 3);
  const last4 = phone.substr(-4);
  
  return `${areaCode}${first3}-${last4}`
}

export {
  getTitle,
  getPhoneNumber,
}
