const mongoose = require('mongoose');
const HealthcareInstitution = require('../models/HealthcareInstitution');
require('dotenv').config();

const institutions = [
  // Salalah Cities
  {
    name: 'Al Saada Health Center',
    arabicName: 'مركز السعاده الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-001'
  },
  {
    name: 'Aldhariz Health Center',
    arabicName: 'مركز الدهاريز الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-002'
  },
  {
    name: 'Awqad Health Center',
    arabicName: 'مركز عوقد الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-003'
  },
  {
    name: 'Hejayf Health Center',
    arabicName: 'مركز حجيف الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-004'
  },
  {
    name: 'Qayroon Hayriti Health Center',
    arabicName: 'مركز قيرون حيريتي الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-005'
  },
  {
    name: 'Salalah Al Gharbiah Health Center',
    arabicName: 'مركز صلالة الغربية الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-006'
  },
  {
    name: 'Salalah Al Jadidah Health Center',
    arabicName: 'مركز صلالة الجديدة الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-007'
  },
  {
    name: 'Titam Health Center',
    arabicName: 'مركز طيطام الصحي',
    type: 'Health Center',
    governorate: 'Salalah',
    sultanQaboosMedicineID: 'SQ-SAL-008'
  },

  // Al Mazyounah Cities
  {
    name: 'Al Mazyounah Hospital',
    arabicName: 'مستشفى المزيونة',
    type: 'Hospital',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-001'
  },
  {
    name: 'Andat Health Center',
    arabicName: 'مركز اندات الصحي',
    type: 'Health Center',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-002'
  },
  {
    name: 'Harwib Health Center',
    arabicName: 'مركز هرويب الصحي',
    type: 'Health Center',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-003'
  },
  {
    name: 'Matoura and Jijwal Health Center',
    arabicName: 'مركز مطورة وججوال الصحي',
    type: 'Health Center',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-004'
  },
  {
    name: 'Mitan Health Center',
    arabicName: 'مركز ميتن الصحي',
    type: 'Health Center',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-005'
  },
  {
    name: 'Tosinat Health Center',
    arabicName: 'مركز توسنات الصحي',
    type: 'Health Center',
    governorate: 'Al Mazyounah',
    sultanQaboosMedicineID: 'SQ-MAZ-006'
  },

  // Thumrait Cities
  {
    name: 'Aibot 2 Health Center',
    arabicName: 'مركز آيبوت 2 الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-001'
  },
  {
    name: 'Al Hashman Health Center',
    arabicName: 'مركز الحشمان الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-002'
  },
  {
    name: 'Barbazum Health Center',
    arabicName: 'مركز بربزوم الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-003'
  },
  {
    name: 'Bethna Health Center',
    arabicName: 'مركز بيثنة الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-004'
  },
  {
    name: 'Muday Health Center',
    arabicName: 'مركز مظى الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-005'
  },
  {
    name: 'Thahbon Health Center',
    arabicName: 'مركز ذهبون الصحي',
    type: 'Health Center',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-006'
  },
  {
    name: 'Thumrait Hospital',
    arabicName: 'مستشفى ثمريت',
    type: 'Hospital',
    governorate: 'Thumrait',
    sultanQaboosMedicineID: 'SQ-THM-007'
  },

  // Rakhyut Cities
  {
    name: 'Shahb Asayb Health Center',
    arabicName: 'مركز شهب أصعيب الصحي',
    type: 'Health Center',
    governorate: 'Rakhyut',
    sultanQaboosMedicineID: 'SQ-RAK-001'
  },

  // Sadah Cities
  {
    name: 'Sadah Hospital',
    arabicName: 'مستشفى سدح',
    type: 'Hospital',
    governorate: 'Sadah',
    sultanQaboosMedicineID: 'SQ-SAD-001'
  },
  {
    name: 'Hadbeen Health Center',
    arabicName: 'مركز حدبين الصحي',
    type: 'Health Center',
    governorate: 'Sadah',
    sultanQaboosMedicineID: 'SQ-SAD-002'
  },
  {
    name: 'Hasik Health Center',
    arabicName: 'مركز حاسك الصحي',
    type: 'Health Center',
    governorate: 'Sadah',
    sultanQaboosMedicineID: 'SQ-SAD-003'
  },
  {
    name: 'Sowb Health Center',
    arabicName: 'مركز صوب الصحي',
    type: 'Health Center',
    governorate: 'Sadah',
    sultanQaboosMedicineID: 'SQ-SAD-004'
  },

  // Shalim Wa Juzur Al Hallaniyat Cities
  {
    name: 'Al Hallaniyat Health Centre',
    arabicName: 'مركز الحلانيات الصحي',
    type: 'Health Center',
    governorate: 'Shalim Wa Juzur Al Hallaniyat',
    sultanQaboosMedicineID: 'SQ-HAL-001'
  },
  {
    name: 'Al Shuwaymiyah Health Center',
    arabicName: 'مركز الشويمية الصحي',
    type: 'Health Center',
    governorate: 'Shalim Wa Juzur Al Hallaniyat',
    sultanQaboosMedicineID: 'SQ-HAL-002'
  },
  {
    name: 'Dimeet Health Center',
    arabicName: 'مركز ديميت الصحي',
    type: 'Health Center',
    governorate: 'Shalim Wa Juzur Al Hallaniyat',
    sultanQaboosMedicineID: 'SQ-HAL-003'
  },
  {
    name: 'Kubut Health Center',
    arabicName: 'مركز كيبوت الصحي',
    type: 'Health Center',
    governorate: 'Shalim Wa Juzur Al Hallaniyat',
    sultanQaboosMedicineID: 'SQ-HAL-004'
  },
  {
    name: 'Sharbthat Health Center',
    arabicName: 'مركز شربثات الصحي',
    type: 'Health Center',
    governorate: 'Shalim Wa Juzur Al Hallaniyat',
    sultanQaboosMedicineID: 'SQ-HAL-005'
  },

  // Dalkut Cities
  {
    name: 'Dalkut Health Center',
    arabicName: 'مركز ظلكوت الصحي',
    type: 'Health Center',
    governorate: 'Dalkut',
    sultanQaboosMedicineID: 'SQ-DAL-001'
  },
  {
    name: 'Sarfeet Health Center',
    arabicName: 'مركز صرفيت الصحي',
    type: 'Health Center',
    governorate: 'Dalkut',
    sultanQaboosMedicineID: 'SQ-DAL-002'
  },
  {
    name: 'Khadrafi Health Center',
    arabicName: 'مركز خضرفي الصحي',
    type: 'Health Center',
    governorate: 'Dalkut',
    sultanQaboosMedicineID: 'SQ-DAL-003'
  },

  // Taqah Cities
  {
    name: 'Madinat Al Haq Hospital',
    arabicName: 'مستشفى مدينة الحق',
    type: 'Hospital',
    governorate: 'Taqah',
    sultanQaboosMedicineID: 'SQ-TAQ-001'
  },
  {
    name: 'Taqah Hospital',
    arabicName: 'مستشفى طاقة',
    type: 'Hospital',
    governorate: 'Taqah',
    sultanQaboosMedicineID: 'SQ-TAQ-002'
  },

  // Mirbat Cities
  {
    name: 'Mirbat Hospital',
    arabicName: 'مستشفى مرباط',
    type: 'Hospital',
    governorate: 'Mirbat',
    sultanQaboosMedicineID: 'SQ-MIR-001'
  },
  {
    name: 'Tawi Atayr Hospital',
    arabicName: 'مستشفى طوي أعتير',
    type: 'Hospital',
    governorate: 'Mirbat',
    sultanQaboosMedicineID: 'SQ-MIR-002'
  },

  // Muqshin Cities
  {
    name: 'Muqshin Hospital',
    arabicName: 'مستشفى مقشن',
    type: 'Hospital',
    governorate: 'Muqshin',
    sultanQaboosMedicineID: 'SQ-MUQ-001'
  }
];

const initializeInstitutions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing institutions
    await HealthcareInstitution.deleteMany({});
    console.log('✓ Cleared existing institutions');

    // Insert all institutions
    await HealthcareInstitution.insertMany(institutions);
    console.log(`✓ Successfully added ${institutions.length} healthcare institutions`);

    // Show summary by governorate
    const summary = {};
    institutions.forEach(inst => {
      if (!summary[inst.governorate]) {
        summary[inst.governorate] = 0;
      }
      summary[inst.governorate]++;
    });

    console.log('\n📊 Institutions by Governorate:');
    Object.entries(summary).forEach(([gov, count]) => {
      console.log(`  ${gov}: ${count} institutions`);
    });

    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing institutions:', error);
    process.exit(1);
  }
};

initializeInstitutions();