function Header (length, messageId, customerId, keyId, created) {
  this.length = length || null;
  this.messageId = messageId || null;
  this.customerId = customerId || null;
  this.keyId = keyId || null;
  this.created = created || Math.floor(Date.now() / 1000);

  this.setLength = function (length) {
    this.length = length;
  };

  this.getLength = function () {
    return this.length;
  };

  this.setMessageId = function (messageId) {
    this.messageId = messageId;
  };

  this.setCustomerId = function (customerId) {
    this.customerId = customerId;
  };

  this.setKeyId = function (keyId) {
    this.keyId = keyId;
  };

  this.setCreated = function (created) {
    this.created = created;
  };

  this.getBytes = function () {
    const length = Buffer.alloc(4);
    const created = Buffer.alloc(4);
    const messageId = Buffer.alloc(4);
    const reserved = Buffer.alloc(32);
    const customerId = Buffer.alloc(2);
    const flagOne = Buffer.alloc(1);
    const flagTwo = Buffer.alloc(1);
    const keyId = Buffer.alloc(4);
    const suffix = Buffer.alloc(48);

    keyId.writeUInt32BE(this.keyId);
    messageId.writeUInt32BE(this.messageId);
    length.writeUInt32BE(this.length);
    created.writeUInt32BE(this.created);
    customerId.writeUInt16BE(this.customerId);

    return Buffer.concat([
      length, created, messageId, reserved, customerId, flagOne, flagTwo, keyId, suffix
    ], 100);
  };
}

module.exports = {
  Header
};
