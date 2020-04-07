const phoneRegex = /\d?\d?[\s-]?(\(?(\d{3})\)?)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g

function getPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  let areaCode = '';

  if(digits.length >= 10) {
    areaCode = `(${digits.substr(0, 3)}) `;
  }

  const first3 = digits.substr(-7, 3);
  const last4 = digits.substr(-4);

  return `${areaCode}${first3}-${last4}`
}

function extendBrandInformation(brands) {
  brands.forEach(brand => {
    if (!brand.post) {
      return
    }

    const phones = brand.post.caption.match(phoneRegex);
    if (Array.isArray(phones) && phones.length) {
      brand.phones = phones.map(getPhoneNumber);
    }

    brand.post.shortCaption = `${brand.post.caption.substring(0, 50)}`;
  });

  return brands
}

exports.extendBrandInformation = extendBrandInformation
