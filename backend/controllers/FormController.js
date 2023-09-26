import Form from "../models/FormModel.js";

// Crear un nuevo formulario

export const createForm = async (req, res) => {
  try {
    const { Email, Name, Subjet, Message } = req.body;

    const newForm = new Form({
      Email,
      Name,
      Subjet,
      Message,
    });

    await newForm.save();

    res.status(201).json({ message: "Formulario creado con éxito.", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el formulario." });
  }
};

// Obtener todos los formularios
export const getAllForms = async (res) => {
  try {
    const forms = await Form.find();
    res.status(202).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los formularios." });
  }
};

// Obtener un formulario por su ID
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ message: "Formulario no encontrado." });
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el formulario." });
  }
};

// Actualizar un formulario por su ID
export const updateFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedForm = await Form.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ message: "Formulario no encontrado." });
    }

    res.status(200).json({ message: "Formulario actualizado con éxito.", form: updatedForm});

  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el formulario." });
  }
};

export const deleteFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
    return res.status(404).json({ message: "Formulario no encontrado." });
    }

    res.status(200).json({ message: "Formulario eliminado con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el formulario." });
  }
};
