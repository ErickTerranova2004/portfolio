const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const emailAddress = 'eterranovav@unemi.edu.ec';

const validators = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  message: (value) => value.trim().length >= 20
};

const setFieldError = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  const errorNode = field?.nextElementSibling;

  if (field) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
  }

  if (errorNode) {
    errorNode.textContent = message;
  }
};

const clearErrors = () => {
  ['name', 'email', 'message'].forEach((fieldId) => setFieldError(fieldId, ''));
};

const submitViaFormSubmit = async ({ name, email, message }) => {
  const payload = {
    name,
    email,
    message,
    _subject: `Mensaje desde el portafolio de ${name}`
  };

  const response = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('No se pudo enviar el correo');
  }
};

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    const formData = new FormData(contactForm);
    const formValues = {};

    for (const [fieldId, validator] of Object.entries(validators)) {
      const value = String(formData.get(fieldId) || '');
      formValues[fieldId] = value.trim();
      const passed = validator(value);

      if (!passed) {
        isValid = false;
        if (fieldId === 'name') {
          setFieldError(fieldId, 'El nombre es obligatorio.');
        }
        if (fieldId === 'email') {
          setFieldError(fieldId, 'Ingrese un correo electrónico válido.');
        }
        if (fieldId === 'message') {
          setFieldError(fieldId, 'El mensaje debe tener al menos 20 caracteres.');
        }
      }
    }

    if (!isValid) {
      if (successMessage) successMessage.textContent = '';
      return;
    }

    try {
      if (successMessage) {
        successMessage.textContent = 'Enviando mensaje...';
      }

      await submitViaFormSubmit({
        name: formValues.name,
        email: formValues.email,
        message: formValues.message
      });

      if (successMessage) {
        successMessage.textContent = 'Mensaje enviado correctamente. Te responderé en breve.';
      }

      contactForm.reset();
    } catch (error) {
      if (successMessage) {
        successMessage.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.';
      }
      console.error(error);
    }
  });
}
