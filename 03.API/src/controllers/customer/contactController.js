const { Contact } = require('../../models');

exports.createContact = async (req, res) => {
  try {
    //Nhận đúng tên biến từ frontend
    const { name_contact, phone_contact, text_contact } = req.body;
    
    // Validation
    if (!name_contact || !phone_contact || !text_contact) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng điền đầy đủ thông tin!' 
      });
    }
    
    // Lưu với đúng tên cột trong database
    await Contact.create({
      name_contact: name_contact.trim(),
      phone_contact: phone_contact.trim(),
      text_contact: text_contact.trim()
      // date_contact tự động = NOW (default value)
    });
    
    return res.status(201).json({ 
      success: true, 
      message: 'Gửi liên hệ thành công!' 
    });
  } catch (error) {
    console.error('Create contact error:', error);
    
    // Xử lý validation error từ Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: error.errors[0].message
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Lỗi máy chủ' 
    });
  }
};