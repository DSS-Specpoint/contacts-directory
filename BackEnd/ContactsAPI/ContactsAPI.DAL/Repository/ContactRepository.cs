using ContactsAPI.DAL.Interface;
using ContactsAPI.ENTITY;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsAPI.DAL.Repository
{
    public class ContactRepository :IContactRepository
    {
        

        private readonly ApplicationDbContext _context;

        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactById(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<Contact> CreateConatct(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task UpdateConytact(Contact contact)
        {
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteContactById(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
               
            }
            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }





    }
}
