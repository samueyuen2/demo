import { Brand } from './Brand';
import { Order } from './Order';
import { Retailer } from './Retailer';

console.log('Setting up database association...');

Order.hasOne(Brand, { as: 'brand', sourceKey: 'brandid', foreignKey: 'id' });
Order.hasOne(Retailer, { as: 'retailer', sourceKey: 'retailerid', foreignKey: 'id' });

// Participant.hasOne(EventRegistration, { as: 'form', sourceKey: 'formId', foreignKey: 'id' });
// Participant.hasOne(Event, { as: 'event', sourceKey: 'eventId', foreignKey: 'id' });
// Participant.hasMany(ParticipantSession, { as: 'pSessions', sourceKey: 'id', foreignKey: 'participantId' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle1Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle1' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle2Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle2' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle3Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle3' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle4Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle4' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle5Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle5' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle6Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle6' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle7Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle7' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle8Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle8' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle9Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle9' });
// Participant.hasOne(CustomPaymentItem, { as: 'paymentTitle10Obj', foreignKey: 'itemId', sourceKey: 'paymentTitle10' });