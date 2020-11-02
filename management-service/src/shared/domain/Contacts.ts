import { WatchedList } from './WatchedList';
import { Contact } from './Contact';

export class Contacts extends WatchedList<Contact> {
  private constructor(initialContacts: Contact[]) {
    super(initialContacts);
  }

  public compareItems(a: Contact, b: Contact): boolean {
    return a.equals(b);
  }

  public static create(initialContacts?: Contact[]): Contacts {
    return new Contacts(initialContacts ?? []);
  }
}
