// Fixture nội dung mẫu cho bộ test contentSchema — đồng thời là TÀI LIỆU
// MẪU cho người soạn bài thật ở Khối 5: cấu trúc dữ liệu, giọng "bạn/mình"
// và hệ ẩn dụ bưu điện của Module 1 (spec mục 3) đều là thật, chỉ rút gọn
// số bài về mức tối thiểu hợp lệ của schema: 4 chặng × 1 bài.
//
// Technical note: every builder returns a brand-new object graph on each
// call (templates hold primitives only, or are deep-cloned), so tests may
// mutate the result freely without leaking state between test cases.

import type {
  Lesson,
  Module,
  PracticeStep,
  TeachScreen,
} from '../../src/engine/contentSchema'
import { vlanRepairLab } from './labFixture'
import { CASE_SAI_GATEWAY, cloneClinicCase } from './clinicFixture'
import { specTaoMotUser } from './psFixture'
import { clonePalace } from './palaceFixture'

export interface MakeLessonOpts {
  /** Mức worked example fading: 0 = ví dụ giải sẵn đầy đủ (bắt buộc ở bài đầu module). */
  fadingLevel?: 0 | 1 | 2
  /** Các conceptId bài này dạy — mỗi concept đúng 1 màn hình (nguyên tắc 3). */
  conceptIds?: string[]
  /**
   * Bước Làm dùng một BÀI LAB thay vì câu gõ tay (spec Module 4). Bật cờ
   * này để chứng minh bài có lab vẫn đi trọn pipeline 6 bước mà máy trạng
   * thái không phải sửa gì.
   */
  labPractice?: boolean
  /**
   * Bước Làm dùng một CA BỆNH phòng khám (spec Module 11) — cùng phép
   * thử kiến trúc với labPractice: dạng câu hỏi thứ sáu đi trọn pipeline
   * mà máy trạng thái không biết nó tồn tại.
   */
  clinicPractice?: boolean
  /**
   * Bước Làm dùng một BÀI TERMINAL POWERSHELL (spec Module 12) — dạng
   * câu hỏi thứ bảy, cùng phép thử kiến trúc.
   */
  psPractice?: boolean
}

// ---------------------------------------------------------------
// Màn hình Dạy theo từng khái niệm — 1 màn = 1 khái niệm (nguyên tắc 3),
// chữ ngắn đặt cạnh hình, chi tiết nâng cao giấu trong deepDive.
// ---------------------------------------------------------------

const TEACH_SCREENS: Record<string, Omit<TeachScreen, 'conceptId'>> = {
  'goi-tin': {
    visualId: 'vis-phong-bi-thu',
    body: {
      vi: 'Dữ liệu không đi qua mạng "nguyên khối" — nó được chia thành từng gói tin, như một bức thư dài được tách ra nhiều phong bì, mỗi phong bì tự mang địa chỉ để tự tìm đường.',
    },
    deepDive: {
      vi: 'Mỗi gói tin gồm header (địa chỉ, số thứ tự) và payload (phần dữ liệu thật). Nhờ số thứ tự, máy nhận ráp các gói về đúng trật tự ban đầu.',
    },
  },
  'dia-chi-ip': {
    visualId: 'vis-dia-chi-nha',
    body: {
      vi: 'Mỗi máy trên mạng có một địa chỉ IP, như mỗi ngôi nhà có một địa chỉ đường. Bưu tá không cần biết trong thư viết gì — chỉ cần địa chỉ ngoài phong bì là đúng.',
    },
    deepDive: {
      vi: 'IPv4 gồm 4 số 0-255 ngăn bởi dấu chấm, ví dụ 192.168.1.10. Máy trong nhà bạn thường dùng dải địa chỉ riêng (private), không trùng với thế giới bên ngoài.',
    },
  },
  port: {
    visualId: 'vis-so-can-ho',
    body: {
      vi: 'Một máy chạy nhiều ứng dụng cùng lúc, nên chỉ địa chỉ IP là chưa đủ — cần thêm số port, như số căn hộ trong một chung cư đông hộ.',
    },
    deepDive: {
      vi: 'Port là số từ 0 đến 65535. Web thường dùng 80/443; mỗi kết nối được định danh bằng cặp IP:port ở cả hai đầu.',
    },
  },
  router: {
    visualId: 'vis-buu-ta',
    body: {
      vi: 'Router là bưu tá của mạng: nhận gói tin, đọc địa chỉ IP đích ngoài "phong bì", rồi chuyển nó sang chặng kế tiếp gần đích hơn.',
    },
    deepDive: {
      vi: 'Router giữ bảng định tuyến (routing table) — như sổ tay các tuyến đường của bưu tá, được cập nhật khi đường đi thay đổi.',
    },
  },
  'giao-thuc': {
    visualId: 'vis-quy-uoc-viet-thu',
    body: {
      vi: 'Hai máy muốn hiểu nhau phải theo cùng một bộ quy tắc gọi là giao thức — như hai người viết thư phải cùng ngôn ngữ, cùng quy ước trình bày.',
    },
    deepDive: {
      vi: 'Mỗi việc có giao thức riêng: HTTP cho web, TCP lo gửi đủ và đúng thứ tự, IP lo địa chỉ và đường đi.',
    },
  },
}

/** Dựng màn dạy cho 1 concept; concept lạ (test tự bịa) vẫn có nội dung hợp lệ. */
function teachScreenFor(conceptId: string): TeachScreen {
  const known = TEACH_SCREENS[conceptId]
  if (known) {
    // Deep-clone the template so each call owns its objects. JSON round-trip
    // instead of structuredClone: the tsconfig lib is pure ES2022 (no
    // runtime-global declarations), and fixture data is plain JSON anyway.
    return { conceptId, ...(JSON.parse(JSON.stringify(known)) as typeof known) }
  }
  return {
    conceptId,
    visualId: `vis-${conceptId}`,
    body: {
      vi: `Khái niệm "${conceptId}" là một mảnh trong hệ bưu điện của mạng — nó có vai trò riêng trên hành trình của phong bì dữ liệu.`,
    },
  }
}

// ---------------------------------------------------------------
// Bộ chữ của một bài học, chọn theo khái niệm CHÍNH (concept đầu tiên).
// Toàn bộ là nội dung thật của Module 1, giọng "bạn/mình" (spec 4.4).
// ---------------------------------------------------------------

interface LessonTexts {
  missionTitle: string
  hook: string
  pretestPrompt: string
  pretestChoices: string[]
  pretestAnswerIndex: number
  /** Giải thích ngắn hiện sau khi đoán (đúng/sai đều thấy — schema bắt buộc). */
  pretestExplain: string
  practicePrompt: string
  practiceAccept: string[]
  practiceHintTopic: string
  practiceHint: string
  practiceSolution: string
  workedExample: string
  retrievalPrompt: string
  retrievalAccept: string[]
  retrievalHint: string
  retrievalSolution: string
  selfExplainPrompt: string
  selfExplainKeywords: string[][]
  selfExplainExample: string
  bullets: [string, string, string]
  nextTeaser: string
}

const GOI_TIN_TEXTS: LessonTexts = {
  missionTitle: 'Đóng gói lá thư đầu tiên',
  hook: 'Một bức ảnh bạn gửi cho bạn bè không hề đi "nguyên tấm" — nó bị xé nhỏ rồi ráp lại ở đầu kia. Vì sao phải phiền phức vậy?',
  pretestPrompt: 'Đoán thử nhé: khi bạn gửi một bức ảnh qua mạng, bức ảnh sẽ...',
  pretestChoices: [
    'Đi nguyên khối tới máy nhận',
    'Bị chia thành nhiều gói nhỏ rồi ráp lại ở máy nhận',
  ],
  pretestAnswerIndex: 1,
  pretestExplain:
    'Bức ảnh được cắt thành nhiều gói tin, mỗi gói tự tìm đường rồi được ráp lại ở máy nhận — bài này sẽ cho bạn thấy vì sao.',
  practicePrompt: 'Trong ẩn dụ bưu điện, phong bì thư tương ứng với thứ gì trong mạng?',
  practiceAccept: ['gói tin', 'goi tin', 'packet'],
  practiceHintTopic: 'vai trò của phong bì khi gửi thư',
  practiceHint: 'Thứ đó "bọc" dữ liệu lại và ghi địa chỉ bên ngoài.',
  practiceSolution:
    'Phong bì tương ứng với gói tin (packet): dữ liệu được bọc lại, bên ngoài ghi địa chỉ máy gửi và máy nhận.',
  workedExample:
    'Ví dụ giải sẵn: muốn gửi câu "chào bạn" từ máy A sang máy B, mình bỏ câu chữ vào phong bì (gói tin), ghi địa chỉ người nhận (địa chỉ IP của máy B) ngoài bì, rồi giao cho bưu tá (router) chuyển đi.',
  retrievalPrompt: 'Không nhìn lại bài: đơn vị dữ liệu được chia nhỏ để gửi qua mạng gọi là gì?',
  retrievalAccept: ['gói tin', 'goi tin', 'packet'],
  retrievalHint: 'Chính là "phong bì" trong câu chuyện bưu điện của mình.',
  retrievalSolution: 'Đó là gói tin (packet) — mỗi gói mang một phần dữ liệu kèm địa chỉ.',
  selfExplainPrompt:
    'Giải thích bằng lời của bạn: vì sao dữ liệu phải chia thành nhiều gói tin thay vì gửi nguyên khối?',
  selfExplainKeywords: [
    ['chia nhỏ', 'nhiều gói', 'tách'],
    ['gửi lại', 'thất lạc', 'mất'],
  ],
  selfExplainExample:
    'Chia nhỏ để nhiều cuộc trò chuyện dùng chung một đường dây; nếu một gói thất lạc, chỉ cần gửi lại đúng gói đó thay vì gửi lại toàn bộ.',
  bullets: [
    'Dữ liệu đi qua mạng dưới dạng gói tin, như thư bỏ trong phong bì.',
    'Mỗi gói tin tự mang địa chỉ nên tự tìm được đường.',
    'Chia nhỏ giúp gửi lại phần thất lạc mà không phải làm lại từ đầu.',
  ],
  nextTeaser: 'Phong bì đã sẵn sàng — nhưng ghi địa chỉ thế nào để thư không lạc? Bài sau mình mở chuyện địa chỉ IP.',
}

const PORT_TEXTS: LessonTexts = {
  missionTitle: 'Tìm đúng căn hộ trong chung cư dữ liệu',
  hook: 'Máy bạn vừa lướt web, vừa nghe nhạc, vừa chat — cùng một địa chỉ IP, sao dữ liệu không giao nhầm ứng dụng?',
  pretestPrompt: 'Đoán thử nhé: hai ứng dụng chạy trên cùng một máy được phân biệt nhờ...',
  pretestChoices: ['Địa chỉ IP khác nhau', 'Số port khác nhau'],
  pretestAnswerIndex: 1,
  pretestExplain:
    'Cả máy chỉ có một địa chỉ IP, nhưng mỗi ứng dụng lắng nghe trên một số port riêng — nhờ đó dữ liệu không giao nhầm cửa.',
  practicePrompt: 'Trong ẩn dụ chung cư, số căn hộ tương ứng với thứ gì trong mạng?',
  practiceAccept: ['port', 'cổng', 'cong', 'số port'],
  practiceHintTopic: 'cách phân biệt các ứng dụng trên cùng một máy',
  practiceHint: 'Đúng tòa nhà (địa chỉ IP) rồi vẫn cần một con số nữa để tới đúng cửa.',
  practiceSolution:
    'Số căn hộ tương ứng với port: địa chỉ IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng.',
  workedExample:
    'Ví dụ giải sẵn: bạn mở trình duyệt vào một trang web — gói tin ghi địa chỉ IP của máy chủ (đúng chung cư) kèm port 443 (đúng căn hộ của dịch vụ web), nên dữ liệu trả về đúng trình duyệt chứ không lạc sang ứng dụng nhạc.',
  retrievalPrompt: 'Không nhìn lại bài: con số giúp gói tin tìm đúng ứng dụng trên một máy gọi là gì?',
  retrievalAccept: ['port', 'cổng', 'cong'],
  retrievalHint: 'Nó giống số căn hộ trong một chung cư.',
  retrievalSolution: 'Đó là port — mỗi ứng dụng lắng nghe trên một số port riêng.',
  selfExplainPrompt: 'Giải thích bằng lời của bạn: vì sao có địa chỉ IP rồi vẫn cần port?',
  selfExplainKeywords: [
    ['nhiều ứng dụng', 'cùng máy', 'cùng một máy'],
    ['phân biệt', 'đúng ứng dụng', 'căn hộ'],
  ],
  selfExplainExample:
    'Một máy chạy nhiều ứng dụng cùng lúc; địa chỉ IP chỉ đưa dữ liệu tới đúng máy, còn port phân biệt dữ liệu đó thuộc ứng dụng nào — như địa chỉ đưa thư tới đúng chung cư, số căn hộ đưa tới đúng cửa.',
  bullets: [
    'Địa chỉ IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng.',
    'Port như số căn hộ trong một chung cư nhiều hộ.',
    'Mỗi kết nối được nhận diện bằng cặp IP và port ở hai đầu.',
  ],
  nextTeaser: 'Ai là người thực sự cầm phong bì đi qua từng chặng đường? Bài sau mình gặp "bưu tá" router.',
}

const ROUTER_TEXTS: LessonTexts = {
  missionTitle: 'Theo chân bưu tá giao phong bì',
  hook: 'Gói tin từ Hà Nội tới máy chủ ở Mỹ đi qua cả chục "trạm" trung gian — ai quyết định rẽ trái hay rẽ phải ở mỗi trạm?',
  pretestPrompt: 'Đoán thử nhé: thiết bị chuyển gói tin từ mạng này sang mạng khác là...',
  pretestChoices: ['Màn hình', 'Router', 'Bàn phím'],
  pretestAnswerIndex: 1,
  pretestExplain:
    'Router là thiết bị đứng giữa các mạng: đọc địa chỉ đích của gói tin rồi quyết định chặng kế tiếp — như bưu tá đọc phong bì.',
  practicePrompt: 'Trong ẩn dụ bưu điện, bưu tá tương ứng với thiết bị nào trong mạng?',
  practiceAccept: ['router', 'bộ định tuyến', 'bo dinh tuyen'],
  practiceHintTopic: 'ai đọc địa chỉ trên phong bì và chọn đường đi',
  practiceHint: 'Thiết bị này đọc địa chỉ IP đích rồi quyết định chặng kế tiếp.',
  practiceSolution:
    'Bưu tá tương ứng với router: nó đọc địa chỉ IP đích trên gói tin và chuyển gói sang chặng gần đích hơn.',
  workedExample:
    'Ví dụ giải sẵn: gói tin cần đi từ nhà bạn tới một máy chủ ở xa — router nhà bạn đọc địa chỉ đích, thấy không thuộc mạng nhà nên chuyển cho router của nhà mạng; cứ thế mỗi "bưu tá" đưa lá thư gần đích thêm một chặng.',
  retrievalPrompt:
    'Không nhìn lại bài: thiết bị đọc địa chỉ IP đích và chọn chặng kế tiếp cho gói tin gọi là gì?',
  retrievalAccept: ['router', 'bộ định tuyến', 'bo dinh tuyen'],
  retrievalHint: 'Chính là "bưu tá" trong câu chuyện gửi thư.',
  retrievalSolution: 'Đó là router (bộ định tuyến) — mỗi router đưa gói tin gần đích thêm một chặng.',
  selfExplainPrompt: 'Giải thích bằng lời của bạn: router làm gì khi nhận được một gói tin?',
  selfExplainKeywords: [
    ['địa chỉ', 'ip', 'đích'],
    ['chuyển', 'chặng', 'chuyển tiếp', 'đường'],
  ],
  selfExplainExample:
    'Router đọc địa chỉ IP đích trên gói tin, tra "sổ tay đường đi" của nó rồi chuyển gói sang chặng kế tiếp gần đích hơn — như bưu tá đọc phong bì rồi đưa thư về đúng tuyến.',
  bullets: [
    'Router là bưu tá: đọc địa chỉ đích rồi chuyển gói tin đi tiếp.',
    'Một gói tin thường đi qua nhiều router trước khi tới nơi.',
    'Mỗi router chỉ cần biết chặng kế tiếp, không cần biết cả con đường.',
  ],
  nextTeaser: 'Địa chỉ đúng, bưu tá giỏi — nhưng hai máy "nói khác thứ tiếng" thì sao? Bài sau mình bàn về giao thức.',
}

const GIAO_THUC_TEXTS: LessonTexts = {
  missionTitle: 'Thống nhất luật chơi giữa hai máy',
  hook: 'Hai người biết địa chỉ của nhau nhưng viết thư bằng hai thứ tiếng khác nhau — thư tới nơi mà vẫn vô dụng. Máy tính tránh chuyện này thế nào?',
  pretestPrompt: 'Đoán thử nhé: bộ quy tắc chung để hai máy hiểu được nhau gọi là...',
  pretestChoices: ['Mật khẩu', 'Giao thức', 'Địa chỉ IP'],
  pretestAnswerIndex: 1,
  pretestExplain:
    'Bộ quy tắc chung đó gọi là giao thức — thư tới đúng địa chỉ nhưng sai quy ước thì bên nhận vẫn không đọc nổi.',
  practicePrompt: 'Bộ quy tắc chung mà hai máy phải cùng tuân theo để hiểu nhau gọi là gì?',
  practiceAccept: ['giao thức', 'giao thuc', 'protocol'],
  practiceHintTopic: 'quy ước chung khi hai bên trao đổi',
  practiceHint: 'Giống quy ước viết thư: cùng ngôn ngữ, cùng cách trình bày.',
  practiceSolution:
    'Đó là giao thức (protocol): tập quy tắc thống nhất về cách đóng gói, gửi và diễn giải dữ liệu.',
  workedExample:
    'Ví dụ giải sẵn: hai máy muốn trao đổi trang web thì cùng "nói" HTTP — máy khách gửi yêu cầu theo đúng mẫu câu HTTP, máy chủ trả lời theo đúng mẫu đó, nhờ vậy hai bên đọc hiểu thư của nhau.',
  retrievalPrompt: 'Không nhìn lại bài: HTTP, TCP, IP được gọi chung là các...',
  retrievalAccept: ['giao thức', 'giao thuc', 'protocol'],
  retrievalHint: 'Là "luật chơi chung" giữa các máy.',
  retrievalSolution: 'Chúng là các giao thức — mỗi giao thức phụ trách một việc trên đường đi của dữ liệu.',
  selfExplainPrompt:
    'Giải thích bằng lời của bạn: vì sao hai máy phải dùng chung giao thức mới trao đổi được?',
  selfExplainKeywords: [
    ['quy tắc', 'quy ước', 'luật'],
    ['hiểu', 'diễn giải', 'đọc được'],
  ],
  selfExplainExample:
    'Không có quy tắc chung thì bên nhận không biết cách diễn giải dãy bit nhận được — như nhận lá thư viết bằng thứ tiếng mình không đọc nổi. Giao thức là quy ước chung giúp hai bên hiểu nhau.',
  bullets: [
    'Giao thức là luật chơi chung để hai máy hiểu nhau.',
    'Thư tới đúng địa chỉ nhưng sai quy ước thì vẫn vô dụng.',
    'Mỗi giao thức phụ trách một việc: HTTP cho web, IP cho địa chỉ và đường đi.',
  ],
  nextTeaser:
    'Bạn đã có đủ bộ tứ: phong bì, địa chỉ, bưu tá, luật chơi. Bài kiểm tra module đang chờ — gửi trọn một "lá thư" từ A tới B nhé.',
}

const LESSON_TEXTS: Record<string, LessonTexts> = {
  'goi-tin': GOI_TIN_TEXTS,
  port: PORT_TEXTS,
  router: ROUTER_TEXTS,
  'giao-thuc': GIAO_THUC_TEXTS,
}

// ---------------------------------------------------------------
// Builders
// ---------------------------------------------------------------

/**
 * Dựng một bài học đủ 6 bước đúng thứ tự Hook → Pretest → Dạy → Làm →
 * Retrieval → Kết (spec 2.1). Question id lấy tiền tố từ lesson id nên
 * hai bài khác id không bao giờ trùng question id.
 */
export function makeLesson(id: string, opts: MakeLessonOpts = {}): Lesson {
  const fadingLevel = opts.fadingLevel ?? 1
  const conceptIds =
    opts.conceptIds && opts.conceptIds.length > 0 ? [...opts.conceptIds] : ['goi-tin']
  // Bộ chữ của bài chọn theo khái niệm chính; concept lạ dùng bộ mặc định.
  const primary = conceptIds[0] ?? 'goi-tin'
  const t = LESSON_TEXTS[primary] ?? GOI_TIN_TEXTS

  const practice: PracticeStep = {
    type: 'practice',
    fadingLevel,
    exercises: [
      {
        question: {
          kind: 'typed',
          id: `${id}-prac-1`,
          prompt: { vi: t.practicePrompt },
          accept: [...t.practiceAccept],
          hintTopic: { vi: t.practiceHintTopic },
        },
        hint: { vi: t.practiceHint },
        solution: { vi: t.practiceSolution },
      },
    ],
  }
  // Mức 0 = có ví dụ giải sẵn đầy đủ (worked example fading bắt đầu từ 0).
  if (fadingLevel === 0) {
    practice.workedExample = { vi: t.workedExample }
  }

  if (opts.labPractice === true) {
    practice.exercises = [
      {
        question: {
          kind: 'lab',
          id: `${id}-prac-lab`,
          prompt: {
            vi: 'Hai máy kế toán đang không gọi được nhau dù địa chỉ trông đúng hết. Sửa lại giúp mình, nhưng nhớ giữ máy kỹ thuật ở riêng.',
          },
          spec: vlanRepairLab(),
          hintTopic: { vi: 'nhóm mà mỗi cổng switch đang thuộc về' },
          explain: {
            vi: 'Hai máy cùng dải địa chỉ vẫn không gọi được nhau nếu cổng của chúng nằm ở hai VLAN khác nhau — switch coi đó là hai mạng tách rời.',
          },
        },
        hint: {
          vi: 'Nhìn từng cổng switch xem nó đang thuộc VLAN số mấy. Hai máy muốn nói chuyện được thì phải cùng một số.',
        },
        solution: {
          vi: 'Kéo cổng của PC-B về VLAN 10 cho khớp PC-A. Giữ PC-C ở VLAN 20 để hai phòng ban vẫn tách nhau — gộp tất cả vào một VLAN là hỏng yêu cầu thứ hai.',
        },
      },
    ]
  }

  if (opts.clinicPractice === true) {
    practice.exercises = [
      {
        question: {
          kind: 'clinic',
          id: `${id}-prac-clinic`,
          prompt: {
            vi: 'Chị kế toán gọi lên phòng IT: "Máy chị sáng giờ không mở được web công ty — hôm qua vẫn bình thường mà!" Khám qua terminal rồi chữa giúp chị ấy nhé.',
          },
          spec: cloneClinicCase(CASE_SAI_GATEWAY),
          diagnosis: {
            choices: [
              { vi: 'Dây mạng bị rút hoặc đứt' },
              { vi: 'Gateway của máy trỏ nhầm địa chỉ' },
              { vi: 'DNS nội bộ ngừng chạy' },
            ],
            answerIndex: 1,
          },
          hintTopic: { vi: 'cánh cửa ra khỏi dải mạng của máy' },
        },
        hint: {
          vi: 'Chạy ipconfig xem gateway của máy đang trỏ về đâu, rồi ping thử chính địa chỉ đó xem có ai trả lời không.',
        },
        solution: {
          vi: 'Gateway đang ghi 192.168.10.99 — một địa chỉ không ai giữ. Sửa lại thành 192.168.10.1 (cổng LAN của router) là máy ra được ngoài.',
        },
      },
    ]
  }

  if (opts.psPractice === true) {
    practice.exercises = [
      {
        question: {
          kind: 'ps',
          id: `${id}-prac-ps`,
          prompt: {
            vi: 'Kế toán có người mới: chị Lê Thị Mai. Tạo tài khoản cho chị ấy vào đúng OU KeToan bằng terminal PowerShell.',
          },
          spec: specTaoMotUser(),
          hintTopic: { vi: 'cmdlet tạo user mới trong miền' },
        },
        hint: {
          vi: 'Cú pháp khuyết: New-ADUser -Name "…" -SamAccountName … -Path "OU=…,DC=noibo,DC=vn". Điền nốt ba chỗ trống.',
        },
        solution: {
          vi: 'New-ADUser -Name "Le Thi Mai" -SamAccountName ltmai -Path "OU=KeToan,DC=noibo,DC=vn" — rồi Get-ADUser -Identity ltmai để tự kiểm chứng.',
        },
      },
    ]
  }

  return {
    id,
    missionTitle: { vi: t.missionTitle },
    steps: [
      {
        type: 'hook',
        question: { vi: t.hook },
        visualId: `vis-hook-${primary}`,
      },
      {
        type: 'pretest',
        questions: [
          {
            kind: 'mcq',
            id: `${id}-pre-1`,
            prompt: { vi: t.pretestPrompt },
            choices: t.pretestChoices.map((c) => ({ vi: c })),
            answerIndex: t.pretestAnswerIndex,
            explain: { vi: t.pretestExplain },
          },
        ],
        encouragement: {
          vi: 'Sai là bình thường — não bạn vừa được "mồi" để học phần tiếp theo tốt hơn.',
        },
      },
      {
        type: 'teach',
        screens: conceptIds.map((cid) => teachScreenFor(cid)),
      },
      practice,
      {
        type: 'retrieval',
        questions: [
          {
            question: {
              kind: 'typed',
              id: `${id}-ret-1`,
              prompt: { vi: t.retrievalPrompt },
              accept: [...t.retrievalAccept],
            },
            hint: { vi: t.retrievalHint },
            solution: { vi: t.retrievalSolution },
          },
        ],
        selfExplain: {
          prompt: { vi: t.selfExplainPrompt },
          keywords: t.selfExplainKeywords.map((group) => [...group]),
          exampleAnswer: { vi: t.selfExplainExample },
        },
      },
      {
        type: 'summary',
        bullets: [{ vi: t.bullets[0] }, { vi: t.bullets[1] }, { vi: t.bullets[2] }],
        nextTeaser: { vi: t.nextTeaser },
      },
    ],
  }
}

/**
 * Module 1 hợp lệ tối thiểu: 4 chặng × 1 bài, 5 khái niệm (bài 1 dạy 2,
 * các bài sau mỗi bài 1), fading 0 → 1 → 1 → 2, mastery test 5 câu đủ
 * cả 3 dạng câu hỏi. Mọi concept đều được dạy ở ít nhất 1 màn hình.
 */
export function makeValidModule(): Module {
  return {
    id: 'module-1',
    order: 1,
    part: 'A',
    title: { vi: 'Mạng là gì? — Câu chuyện bưu điện' },
    stages: [
      { id: 'chang-1', title: { vi: 'Phong bì và địa chỉ' }, lessonIds: ['bai-1'] },
      { id: 'chang-2', title: { vi: 'Gõ đúng cửa căn hộ' }, lessonIds: ['bai-2'] },
      { id: 'chang-3', title: { vi: 'Bưu tá lên đường' }, lessonIds: ['bai-3'] },
      { id: 'chang-4', title: { vi: 'Luật chơi chung' }, lessonIds: ['bai-4'] },
    ],
    lessons: [
      makeLesson('bai-1', { fadingLevel: 0, conceptIds: ['goi-tin', 'dia-chi-ip'] }),
      makeLesson('bai-2', { fadingLevel: 1, conceptIds: ['port'] }),
      makeLesson('bai-3', { fadingLevel: 1, conceptIds: ['router'] }),
      makeLesson('bai-4', { fadingLevel: 2, conceptIds: ['giao-thuc'] }),
    ],
    concepts: [
      {
        id: 'goi-tin',
        term: 'Packet',
        glossVi: 'Gói tin — đơn vị dữ liệu nhỏ được gửi qua mạng',
        metaphor: {
          vi: 'Gói tin như phong bì thư: bên trong là nội dung, bên ngoài ghi địa chỉ gửi và nhận.',
        },
        iconId: 'icon-goi-tin',
        flashcard: {
          front: { vi: 'Gói tin (packet) là gì?' },
          back: {
            vi: 'Đơn vị dữ liệu nhỏ được gửi qua mạng — như một phong bì thư mang một phần nội dung kèm địa chỉ.',
          },
        },
      },
      {
        id: 'dia-chi-ip',
        term: 'IP address',
        glossVi: 'Địa chỉ IP — con số định danh một máy trên mạng',
        metaphor: {
          vi: 'Địa chỉ IP như địa chỉ nhà: bưu tá chỉ cần nhìn nó để biết giao thư đến đâu.',
        },
        iconId: 'icon-dia-chi-ip',
        flashcard: {
          front: { vi: 'Địa chỉ IP dùng để làm gì?' },
          back: {
            vi: 'Định danh một máy trên mạng để gói tin tìm đến đúng nơi — như địa chỉ nhà ghi trên phong bì.',
          },
        },
      },
      {
        id: 'port',
        term: 'Port',
        glossVi: 'Cổng — con số phân biệt các ứng dụng trên cùng một máy',
        metaphor: {
          vi: 'Port như số căn hộ trong chung cư: đúng tòa nhà rồi vẫn phải gõ đúng cửa.',
        },
        iconId: 'icon-port',
        flashcard: {
          front: { vi: 'Port dùng để làm gì?' },
          back: {
            vi: 'Phân biệt các ứng dụng trên cùng một máy — IP tìm đúng máy, port tìm đúng ứng dụng.',
          },
        },
      },
      {
        id: 'router',
        term: 'Router',
        glossVi: 'Bộ định tuyến — thiết bị chuyển gói tin giữa các mạng',
        metaphor: {
          vi: 'Router như bưu tá: đọc địa chỉ trên phong bì rồi chọn chặng tiếp theo cho lá thư.',
        },
        iconId: 'icon-router',
        flashcard: {
          front: { vi: 'Router làm nhiệm vụ gì?' },
          back: {
            vi: 'Đọc địa chỉ IP đích của gói tin và chuyển nó sang chặng kế tiếp gần đích hơn.',
          },
        },
      },
      {
        id: 'giao-thuc',
        term: 'Protocol',
        glossVi: 'Giao thức — bộ quy tắc chung để hai máy hiểu nhau',
        metaphor: {
          vi: 'Giao thức như quy ước viết thư: cùng ngôn ngữ, cùng cách trình bày thì mới đọc được thư của nhau.',
        },
        iconId: 'icon-giao-thuc',
        flashcard: {
          front: { vi: 'Giao thức (protocol) là gì?' },
          back: {
            vi: 'Bộ quy tắc chung mà hai máy cùng tuân theo để đóng gói, gửi và diễn giải dữ liệu.',
          },
        },
      },
    ],
    masteryTest: [
      {
        kind: 'typed',
        id: 'mt-1',
        prompt: { vi: 'Trong ẩn dụ bưu điện, "địa chỉ nhà" tương ứng với thứ gì trong mạng?' },
        accept: ['địa chỉ ip', 'dia chi ip', 'ip', 'ip address'],
        hintTopic: { vi: 'thứ giúp bưu tá biết giao thư đến đâu' },
        explain: { vi: 'Địa chỉ IP định danh máy nhận trên mạng — như địa chỉ nhà ghi ngoài phong bì để bưu tá biết giao đến đâu.' },
      },
      {
        kind: 'mcq',
        id: 'mt-2',
        prompt: { vi: 'Thiết bị nào đóng vai "bưu tá" chuyển gói tin giữa các mạng?' },
        choices: [{ vi: 'Router' }, { vi: 'Màn hình' }, { vi: 'Ổ cứng' }],
        answerIndex: 0,
        explain: { vi: 'Router đọc địa chỉ IP đích trên gói tin rồi chuyển nó sang chặng kế tiếp gần đích hơn.' },
      },
      {
        kind: 'typed',
        id: 'mt-3',
        prompt: { vi: 'Con số giúp phân biệt các ứng dụng trên cùng một máy gọi là gì?' },
        accept: ['port', 'cổng', 'cong'],
        explain: { vi: 'IP đưa gói tin tới đúng máy, port đưa nó tới đúng ứng dụng — như số căn hộ trong một chung cư.' },
      },
      {
        kind: 'order',
        id: 'mt-4',
        prompt: { vi: 'Sắp xếp hành trình của một tin nhắn từ máy A đến máy B theo đúng thứ tự.' },
        items: [
          { vi: 'Máy A chia tin nhắn vào các gói tin, ghi địa chỉ IP của máy B' },
          { vi: 'Gói tin rời máy A, đến router đầu tiên' },
          { vi: 'Các router lần lượt chuyển gói tin về gần máy B' },
          { vi: 'Máy B nhận đủ các gói và ráp lại thành tin nhắn' },
        ],
        explain: { vi: 'Chia gói → rời máy gửi → qua từng router gần đích dần → máy nhận ráp lại. Mỗi chặng chỉ cần biết chặng kế tiếp.' },
      },
      {
        kind: 'typed',
        id: 'mt-5',
        prompt: { vi: 'Bộ quy tắc chung để hai máy hiểu được nhau gọi là gì?' },
        accept: ['giao thức', 'giao thuc', 'protocol'],
        explain: { vi: 'Giao thức là luật chơi chung: cùng quy ước đóng gói và diễn giải thì hai máy mới đọc hiểu dữ liệu của nhau.' },
      },
    ],
  }
}

/** Đoạn đường mẫu: tầng 1 của cung điện (3 phòng). */
export const PALACE_FLOOR_1 = ['r-http', 'r-https', 'r-dns']

/**
 * Module có CUNG ĐIỆN KÝ ỨC: bài 1 dẫn đi xem tầng 1 ở bước Dạy, rồi
 * bắt đi lại đúng ba phòng đó ở bước Nhớ lại. Đây là hình dạng dữ liệu
 * mà Module 5 sẽ khai thật — và cũng là ca kiểm luật "đi xem trước, nhớ
 * lại sau" của schema.
 */
export function makeModuleWithPalace(): Module {
  const mod = makeValidModule()
  const lesson = mod.lessons.find((l) => l.id === 'bai-1')
  if (lesson === undefined) throw new Error('makeModuleWithPalace: thiếu bài 1')

  const firstScreen = lesson.steps[2].screens[0]
  if (firstScreen === undefined) throw new Error('makeModuleWithPalace: bài 1 không có màn dạy')
  firstScreen.palaceTour = [...PALACE_FLOOR_1]

  lesson.steps[4].questions.push({
    question: {
      kind: 'palace-walk',
      id: 'pw-tang-1',
      prompt: { vi: 'Đi lại tầng 1 của tòa nhà từ trí nhớ: mỗi phòng là cổng nào, dịch vụ gì?' },
      rooms: [...PALACE_FLOOR_1],
      hintTopic: { vi: 'hình bạn thấy trong từng phòng' },
    },
    hint: { vi: 'Nhớ lại thứ đặt trong phòng trước đã — con số thường đi theo hình.' },
    solution: { vi: 'Tầng 1: cửa mở toang là 80 (HTTP), ổ khóa vàng là 443 (HTTPS), cuốn danh bạ là 53 (DNS).' },
  })

  mod.palace = clonePalace()
  return mod
}
