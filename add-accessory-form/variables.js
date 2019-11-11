const name = document.getElementById('name');
const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');
const description = document.getElementById('description');
const submitButton = document.getElementById('submit-button');
const imageLink = document.getElementById('image-link');
const errorSummary = document.getElementById('error-summary');

const nameError = 'name-error';
const priceFromError = 'price-from-error';
const priceToError = 'price-to-error';
const descError = 'desc-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";
