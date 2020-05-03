const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana']

function getTitle(post) {
  const { location, user } = post
  if (location && location.name && !blackListLocations.includes(location.name)) {
    return location.name
  }

  return user && user.fullName 
}

function getWhatsAppNumber(caption) {
  return caption;
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
