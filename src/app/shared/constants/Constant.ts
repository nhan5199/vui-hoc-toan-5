export default class {
  static readonly FOLDER_CONSTRUCTOR = [
    {
      name: 'ke-hoach-bai-day',
      folder: [
        {
          name: 'canh-dieu',
        },
        {
          name: 'ket-noi-tri-thuc',
        },
        {
          name: 'chan-troi-sang-tao',
        },
      ],
    },
    {
      name: 'giao-an-dien-tu',
      folder: [
        {
          name: 'canh-dieu',
        },
        {
          name: 'ket-noi-tri-thuc',
        },
        {
          name: 'chan-troi-sang-tao',
        },
      ],
    },
    {
      name: 'tai-nguyen',
      folder: [],
    },
    {
      name: 'kiem-tra-danh-gia',
      folder: [
        {
          name: 'van-ban',
        },
        {
          name: 'phieu-bai-tap',
        },
        {
          name: 'huong-dan-danh-gia',
        },
        {
          name: 'de-kiem-tra',
        },
      ],
    },
  ];

  // Populated from the generated catalog before route components start.
  static readonly IMAGE_PATHS: { images: string[] } = { images: [] };
  static readonly FILE_PATH: { files: string[] } = { files: [] };
  private static imageMatches = new Map<string, string[]>();

  static findImages(fragment: string): string[] {
    if (!fragment) return [];
    let matches = this.imageMatches.get(fragment);
    if (!matches) {
      matches = this.IMAGE_PATHS.images.filter(path => path.includes(fragment));
      this.imageMatches.set(fragment, matches);
    }
    // Callers sort/transform their own lists; never let them mutate the shared cache.
    return [...matches];
  }

  static clearImageMatches(): void { this.imageMatches.clear(); }
}

export enum QuestionType {
  MultipleChoice = 1,
  YesNo = 2,
}
