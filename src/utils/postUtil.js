const blackListLocations = ['Tijuana, Baja California', 'Tijuana Centro, Tijuana']

function getTitle(post) {
  const { location, user } = post
  if (location && location.name && !blackListLocations.includes(location.name)) {
    return location.name
  }

  return user && user.fullName 
}

function getPhoneNumber(phone) {
  const areaCode = phone.length >= 10 ? `(${phone.substr(0, 3)})` : '';
  const first3 = phone.substr(-7, 3);
  const last4 = phone.substr(-4);
  
  return `${areaCode}${first3}-${last4}`
}

export function getWhatsapp(caption) {
  const re = /(WHATSAPP|WHATS\sAPP)/i;
  let whatsapp ='';

  if (re.test(caption)) {
    const matches = re.exec(caption);
    const substr = caption.slice(matches.index);
    const onlyNumbers = substr.replace(/\D/g, '-').replace(/--/g, '-');
    const numberArray = onlyNumbers.match(/(\d{1,2}-)?(\d{3}-)?\d{3}-\d{4,7}|(\d{3}-)\d{2}-\d{2}|\d{7,10}/g);
    if(numberArray) {
      whatsapp = '52' + numberArray[0].replace(/-/g, '');
    }
  } 
  return whatsapp;
}

export {
  getTitle,
  getPhoneNumber,
}
