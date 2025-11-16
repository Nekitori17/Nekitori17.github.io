(async () => {
  for (let i = 1; i <= 10; i++) {
    EventBus.emit('switchCharacter');
    console.log(`Switch #${i}`);
    await delay(2000);
  }
  console.log('Test completed!');
})();