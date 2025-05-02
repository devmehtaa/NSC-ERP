from django.contrib import admin


from django.contrib import admin
from .models import Supplier, ContactPerson, Product

class ContactPersonInline(admin.TabularInline):
    model = ContactPerson
    extra = 1

class ProductInline(admin.TabularInline):
    model = Product
    extra = 1

class SupplierAdmin(admin.ModelAdmin):
    inlines = [ContactPersonInline, ProductInline]
    list_display = ('name', 'main_person', 'address', 'website')
    search_fields = ('name', 'main_person__name')

admin.site.register(Supplier, SupplierAdmin)
admin.site.register(ContactPerson)
admin.site.register(Product)

