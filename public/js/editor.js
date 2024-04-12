$(function() {
   
$('textarea#des').each(function() {
       CKEDITOR.replace($(this).attr('id'));
   });
  
  $('textarea#tut').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#quest').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#schl').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#career').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#fund').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#prg').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});

$('textarea#curri').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#intro').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});
$('textarea#admissions').each(function() {
   CKEDITOR.replace($(this).attr('id'));
});

   if ($("data-fancybox").length) {
       $("data-fancybox").fancybox();
   }
});


$('a.confirmDeletion').on('click', function(e) {
   if (!confirm('Confirm deletion')) {
       return false;
   }
});
function googleTranslateElementInit() {
   new google.translate.TranslateElement(
       { 
           pageLanguage: 'en', // Set pageLanguage to 'en' for English
           includedLanguages: 'fr,de,en,es,ru,ar', // Add more languages as needed
           layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
           autoDisplay: false,
           multilanguagePage: true,
           gaTrack: true,
           gaId: 'UA-XXXXX-Y',
           sourceLanguage: 'en', // Set sourceLanguage to 'en' to enforce English
           destinationLanguage: 'ta' // Set destinationLanguage to 'ta' for Tamil
       },
       'google_translate_element'
   );
}

