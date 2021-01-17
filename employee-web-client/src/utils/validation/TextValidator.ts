/* eslint-disable no-useless-escape */

export class TextValidator {
  public static validateWebURL(url: string) {
    const re = /^(((http|HTTP|https|HTTPS|ftp|FTP|ftps|FTPS|sftp|SFTP):\/\/)|((w|W){3}(\d)?\.))[\w\?!\.\/:;,\-_=#+*%@&quot;\(\)&amp;]+/;
    return re.test(url);
  }

  public static validateEmailAddress(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  public static validatePhoneNumber(phone: string) {
    const re = /^(\+\d{1,3}(\s){0,1}\d+(\-\d+)*((\s)\/(\s)?(\+\d{1,3}\s)?\d+(\-\d+)*)*)$/;
    return re.test(phone);
  }

  public static validateDate(date: string) {
    // https://ihateregex.io/expr/date/
    const re = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
    return re.test(date);
  }

  public static validateHour(time: string) {
    const re = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    return !!time.match(re);
  }

  public static slugify(url: string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return url
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, ''); // Trim - from start of text
  }

  public static createRandomNumericString(numberDigits: number): string {
    const chars = '0123456789';
    let value = '';

    for (let i = numberDigits; i > 0; --i) {
      value += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    return value;
  }
}
