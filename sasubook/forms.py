from django import forms
from sasubook.models import PdfFile


class  UploadPdfForm(forms.ModelForm):
    class Meta:
        model = PdfFile
        fields = '__all__' 