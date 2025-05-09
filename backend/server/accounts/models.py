from django.db import models

from django.db import models

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    website = models.URLField(blank=True)
    main_person = models.ForeignKey('ContactPerson', on_delete=models.SET_NULL, null=True, blank=True, related_name='main_contact_supplier')

    def __str__(self):
        return self.name


class ContactPerson(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    designation = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.name} - {self.supplier.name}"


class Product(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50, help_text="e.g., kg, liters, pieces")
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name}"
