document.getElementById('feedbackForm')?.addEventListener('submit', function(event) {  
    event.preventDefault(); // Mencegah pengiriman form  
  
    const name = document.getElementById('name').value;  
    const message = document.getElementById('message').value;  
  
    // Tampilkan respons  
    document.getElementById('feedbackResponse').innerHTML = `  
        <h3>Thank you for your feedback, ${name}!</h3>  
        <p>Your message: ${message}</p>  
    `;  
  
    // Reset form  
    document.getElementById('feedbackForm').reset();  
});  

// Menangani tombol hapus  
document.getElementById('clearButton')?.addEventListener('click', function() {  
    document.getElementById('feedbackForm').reset(); // Menghapus input  
    document.getElementById('feedbackResponse').innerHTML = ''; // Menghapus respons  
});  


