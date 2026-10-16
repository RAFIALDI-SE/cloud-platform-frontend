(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const loginWrap = document.getElementById("login-wrap");
  const loginMenu = document.getElementById("login-menu");
  const client = document.getElementById("client");
  const clientPortal = document.getElementById("client-portal");
  const clientLogin = document.getElementById("client-login");
  const clientRegister = document.getElementById("client-register");
  const API_BASE_URL = ["localhost", "127.0.0.1"].includes(location.hostname)
    ? "http://127.0.0.1:3000"
    : "https://api.zeixon.com";

  const menuButtons = document.querySelectorAll("[data-menu]");
  const languageSelect = document.getElementById("language-select");
  const languagePicker = document.querySelector(".language-picker");
  const languageToggle = document.getElementById("language-toggle");
  const languageMenu = document.getElementById("language-menu");
  const languageOptions = document.querySelectorAll("[data-language-choice]");
  const translations = {
    en: new Map(),
    "zh-CN": new Map(),
  };
  const translationEntries = [
    ["Lewati ke konten", "Skip to content", "跳转到内容"],
    ["Produk", "Products", "产品"],
    ["Featured Products", "Featured Products", "精选产品"],
    ["Cloud & Server", "Cloud & Server", "云与服务器"],
    ["Domain & Website", "Domain & Website", "域名与网站"],
    ["Solution & Addons", "Solutions & Add-ons", "解决方案与附加服务"],
    ["Developer Tools", "Developer Tools", "开发者工具"],
    ["Server cloud cepat & scalable.", "Fast and scalable cloud servers.", "快速且可扩展的云服务器。"],
    ["VPS terjangkau untuk website bisnis.", "Affordable VPS for business websites.", "适用于商业网站的高性价比 VPS。"],
    ["Tempatkan server Anda di data center premium.", "Place your server in a premium data center.", "将您的服务器部署在高端数据中心。"],
    ["Hosting khusus WordPress siap pakai.", "Ready-to-use hosting built for WordPress.", "专为 WordPress 打造，即开即用的主机服务。"],
    ["Server khusus full control untuk beban tinggi.", "Dedicated servers with full control for demanding workloads.", "为高负载任务提供完全控制权的专用服务器。"],
    ["VPS dengan WHM cPanel untuk kelola hosting.", "VPS with WHM cPanel for hosting management.", "配备 WHM cPanel 的 VPS，轻松管理主机服务。"],
    ["Proteksi keamanan siber untuk infrastruktur.", "Cybersecurity protection for your infrastructure.", "为您的基础设施提供网络安全防护。"],
    ["Server akselerator AI & Deep Learning.", "AI and deep learning accelerator servers.", "AI 与深度学习加速服务器。"],
    ["Cadangan data aman dan fleksibel untuk bisnis Anda.", "Secure and flexible data backups for your business.", "为您的企业提供安全灵活的数据备份。"],
    ["Cloud Products", "Cloud Products", "云产品"],
    ["Performa tinggi untuk database & beban komputasi.", "High performance for databases and compute workloads.", "为数据库和计算负载提供高性能。"],
    ["Akselerasi LLM, PyTorch & Machine Learning.", "Accelerate LLMs, PyTorch, and machine learning.", "加速 LLM、PyTorch 与机器学习任务。"],
    ["Akses root penuh ke hardware fisik tanpa virtualisasi.", "Full root access to physical hardware without virtualization.", "无需虚拟化，直接获得物理硬件的完整 root 权限。"],
    ["Orkestrasi container otomatis skala enterprise.", "Enterprise-scale automated container orchestration.", "企业级自动化容器编排。"],
    ["Domain Products", "Domain Products", "域名产品"],
    ["Registrasi Domain", "Domain Registration", "域名注册"],
    ["Beli domain .id, .com, .net dengan instan.", "Register .id, .com, and .net domains instantly.", "即时注册 .id、.com 和 .net 域名。"],
    ["Pindahkan domain Anda ke ZeixonCloudHouse.", "Transfer your domain to ZeixonCloudHouse.", "将您的域名转入 ZeixonCloudHouse。"],
    ["Enkripsi data HTTPS untuk keamanan website.", "HTTPS encryption to secure your website.", "使用 HTTPS 加密保护您的网站。"],
    ["Solution Products", "Solution Products", "解决方案产品"],
    ["Mitigasi serangan DDoS volume tinggi.", "Mitigate high-volume DDoS attacks.", "缓解大流量 DDoS 攻击。"],
    ["MySQL, PostgreSQL, dan MongoDB otomatis kelola.", "Managed MySQL, PostgreSQL, and MongoDB.", "托管 MySQL、PostgreSQL 和 MongoDB。"],
    ["Penyimpanan berkas media tak terbatas.", "Unlimited media file storage.", "无限媒体文件存储。"],
    ["Tools Products", "Tools Products", "工具产品"],
    ["REST API untuk otomatisasi provisioning instance.", "REST API for automated instance provisioning.", "用于自动化实例配置的 REST API。"],
    ["Deploy WordPress, Docker, Node.js dalam 60 detik.", "Deploy WordPress, Docker, or Node.js in 60 seconds.", "60 秒内即可部署 WordPress、Docker 或 Node.js。"],
    ["Anda butuh spesifikasi server custom untuk kebutuhan bisnis Anda? Silakan ajukan formulir Request Penawaran server custom yang akan dibantu oleh tim ZeixonCloudHouse.", "Need custom server specifications for your business? Submit a custom server quote request and our ZeixonCloudHouse team will help.", "您的业务需要定制服务器配置吗？请提交定制服务器报价申请，ZeixonCloudHouse 团队将为您提供协助。"],
    ["Selengkapnya", "Learn more", "了解更多"],
    ["Request Penawaran", "Request a Quote", "申请报价"],
    ["Panduan", "Guides", "指南"],
    ["Blog", "Blog", "博客"],
    ["Kamus Hosting", "Hosting Glossary", "主机术语表"],
    ["Tiket", "Support Tickets", "支持工单"],
    ["Pembayaran", "Payments", "付款"],
    ["Kontak", "Contact", "联系"],
    ["Harga", "Pricing", "价格"],
    ["Solusi", "Solutions", "解决方案"],
    ["Solution by Industry", "Solutions by Industry", "按行业分类的解决方案"],
    ["Solution by Apps", "Solutions by Application", "按应用分类的解决方案"],
    ["Education", "Education", "教育"],
    ["Finance", "Finance", "金融"],
    ["Retail", "Retail", "零售"],
    ["Tour & Travel", "Tour & Travel", "旅游与出行"],
    ["e-Commerce", "E-commerce", "电子商务"],
    ["Manufacturing & Distribution", "Manufacturing & Distribution", "制造与分销"],
    ["Medical & Healthcare", "Medical & Healthcare", "医疗与健康"],
    ["Media", "Media", "媒体"],
    ["Government", "Government", "政府"],
    ["AI Research & LLM", "AI Research & LLM", "AI 研究与 LLM"],
    ["High-Traffic Database", "High-Traffic Database", "高流量数据库"],
    ["Corporate Remote ERP", "Corporate Remote ERP", "企业远程 ERP"],
    ["Secure Fintech Sandbox", "Secure Fintech Sandbox", "安全金融科技沙盒"],
    ["Menyediakan teknologi terbaru untuk mendukung pembelajaran digital yang efektif dan inovatif.", "Providing the latest technology for effective and innovative digital learning.", "提供最新技术，支持高效、创新的数字化学习。"],
    ["Mengelola finansial company Anda dengan solusi layanan yang aman dan terpercaya.", "Manage your company's finances with secure and reliable services.", "通过安全可靠的服务解决方案管理企业财务。"],
    ["Meningkatkan bisnis retail Anda menjadi lebih efisien dengan kinerja yang maksimal.", "Make your retail business more efficient with maximum performance.", "以卓越性能提升零售业务效率。"],
    ["Menawarkan sistem terdepan dengan teknologi canggih untuk bisnis tour dan travel Anda.", "Advanced systems and technology for your tour and travel business.", "为您的旅游业务提供先进系统与尖端技术。"],
    ["Mengoptimalkan pertumbuhan bisnis E-Commerce Anda dengan aman dan scalable.", "Grow your e-commerce business securely and at scale.", "安全、灵活地扩展您的电子商务业务。"],
    ["Meningkatkan produktivitas bisnis manufaktur dan distribusi Anda menjadi lebih optimal.", "Optimize productivity across your manufacturing and distribution business.", "优化制造与分销业务的生产效率。"],
    ["Memberikan layanan solusi yang inovatif untuk mendukung efisiensi pelayanan dan kualitas kesehatan lebih baik.", "Innovative solutions that improve service efficiency and healthcare quality.", "通过创新解决方案提升服务效率与医疗质量。"],
    ["Mendukung kebutuhan pada industri media Anda dengan kecepatan dan skalabilitas tanpa batas.", "Support your media business with speed and virtually unlimited scalability.", "以高速和灵活扩展能力支持您的媒体业务。"],
    ["Solusi infrastruktur digital yang andal untuk pemerintahan.", "Reliable digital infrastructure solutions for government.", "为政府机构提供可靠的数字基础设施解决方案。"],
    ["Kluster GPU Tesla untuk inferensi kecerdasan buatan, computer vision, dan automasi.", "Tesla GPU clusters for AI inference, computer vision, and automation.", "Tesla GPU 集群适用于 AI 推理、计算机视觉和自动化。"],
    ["Solusi kluster database dengan latency ultra rendah berbasis solid state NVMe murni.", "Ultra-low-latency database clusters powered by all-flash NVMe.", "基于全闪存 NVMe 的超低延迟数据库集群。"],
    ["Infrastruktur privat untuk aplikasi SAP, Odoo, dan sistem akuntansi terpusat.", "Private infrastructure for SAP, Odoo, and centralized accounting systems.", "为 SAP、Odoo 和集中式会计系统提供专用基础设施。"],
    ["Lingkungan komputasi terisolasi dengan compliance standar keamanan data tinggi.", "Isolated computing environments that meet demanding data security standards.", "隔离式计算环境，满足严格的数据安全标准。"],
    ["Solusi layanan terbaik untuk Anda! Bersama ZeixonCloudHouse, temukan solusi yang tepat untuk mengembangkan bisnis Anda dalam berbagai bidang yang berbeda. Mari simak testimoni dari para pelanggan unggulan kami!", "Find the right ZeixonCloudHouse services to grow your business across industries. Read what our valued customers have to say!", "与 ZeixonCloudHouse 一起，为不同行业的业务增长找到合适的服务方案。来看看优秀客户的评价！"],
    ["Program", "Programs", "计划"],
    ["Affiliate", "Affiliate Program", "联盟计划"],
    ["Event & Program", "Events & Programs", "活动与计划"],
    ["Partnership", "Partnership", "合作伙伴"],
    ["Program Ekabima", "Ekabima Program", "Ekabima 计划"],
    ["Program NGO Go Digital", "NGO Go Digital Program", "NGO 数字化计划"],
    ["Partnership & Program", "Partnerships & Programs", "合作伙伴与计划"],
    ["Dapatkan komisi hingga 45% dari referensi penjualan Anda di ZeixonCloudHouse.", "Earn up to 45% commission from your ZeixonCloudHouse sales referrals.", "通过推荐 ZeixonCloudHouse 销售，最高可获得 45% 佣金。"],
    ["Ikuti Keseruan Berbagai Event Online & Offline Gratis dari ZeixonCloudHouse.", "Join free ZeixonCloudHouse online and offline events.", "参加 ZeixonCloudHouse 免费线上及线下活动。"],
    ["Perluas bisnis dan project Anda dengan Kemitraan ZeixonCloudHouse.", "Expand your business and projects with ZeixonCloudHouse partnerships.", "通过 ZeixonCloudHouse 合作伙伴计划拓展业务与项目。"],
    ["Program Sosial untuk Mendigitalisasikan Sekolah-sekolah di Seluruh Indonesia.", "A social program to help schools across Indonesia go digital.", "帮助印度尼西亚各地学校实现数字化的公益计划。"],
    ["Program Mendigitalisasikan NGO / Yayasan / Komunitas yang bermanfaat di Indonesia.", "A program to help NGOs, foundations, and communities in Indonesia go digital.", "帮助印度尼西亚 NGO、基金会和社区实现数字化的计划。"],
    ["ZeixonCloudHouse sangat yakin bahwa kolaborasi dapat membantu bisnis bisa berlari makin kencang. Ayo berkolaborasi dengan ZeixonCloudHouse!", "ZeixonCloudHouse believes collaboration helps businesses move faster. Let's work together!", "ZeixonCloudHouse 深信合作能助力企业加速发展。让我们携手合作！"],
    ["Bantuan", "Support", "帮助"],
    ["Panduan", "Guides", "指南"],
    ["Kumpulan tutorial praktis dan langkah demi langkah.", "Practical, step-by-step tutorials.", "实用的分步教程。"],
    ["Artikel terbaru seputar hosting, cloud, dan keamanan digital.", "The latest articles on hosting, cloud, and digital security.", "有关主机、云计算和数字安全的最新文章。"],
    ["Istilah penting hosting dijelaskan dengan mudah dan cepat.", "Hosting terms explained clearly and quickly.", "轻松快速了解主机服务相关术语。"],
    ["Ajukan dan pantau tiket dukungan langsung dari customer service.", "Submit and track support tickets with customer service.", "直接向客服提交并跟踪支持工单。"],
    ["Informasi cara bayar dan metode pembayaran yang tersedia.", "Payment instructions and available payment methods.", "付款说明及可用支付方式。"],
    ["Hubungi tim support bila butuh bantuan cepat dan personal.", "Contact our support team for fast, personal assistance.", "如需快速、专属协助，请联系支持团队。"],
    ["Tim Support dan Customer Service ZeixonCloudHouse bekerja setiap hari untuk memberikan layanan terbaik untuk kebutuhan Website Anda.", "Our support and customer service teams are here every day to provide the best services for your website.", "ZeixonCloudHouse 支持与客服团队每天为您提供优质网站服务。"],
    ["Tentang Perusahaan", "About the Company", "关于公司"],
    ["Promo", "Promotions", "优惠活动"],
    ["Customer", "Customers", "客户"],
    ["Customer Portal", "Customer Portal", "客户门户"],
    ["Bahasa", "Language", "语言"],
    ["Bahasa Indonesia", "Indonesian", "印度尼西亚语"],
    ["English", "English", "英语"],
    ["Bahasa China", "Chinese", "中文"],
    ["LOGIN", "LOGIN", "登录"],
    ["PORTAL ZEIXONCLOUD", "ZEIXONCLOUD PORTAL", "ZEIXONCLOUD 门户"],
    ["Client Area", "Client Area", "客户专区"],
    ["⚡ Performa Cepat dan Stabil", "⚡ Fast and Stable Performance", "⚡ 快速稳定的性能"],
    ["Cloud VPS eXtreme dengan Teknologi NVMe", "Cloud VPS eXtreme with NVMe Technology", "采用 NVMe 技术的 Cloud VPS eXtreme"],
    ["Dengan teknologi NVMe, Cloud VPS eXtreme menghadirkan performa lebih cepat, efisien dan stabil dengan berbagai keunggulan:", "Powered by NVMe, Cloud VPS eXtreme delivers faster, more efficient, and stable performance with these benefits:", "Cloud VPS eXtreme 采用 NVMe 技术，带来更快速、高效、稳定的性能优势："],
    ["Performa hingga 6 kali lebih cepat dari Gen sebelumnya", "Up to 6x faster than the previous generation", "性能比上一代快至 6 倍"],
    ["Dukungan S3 kompatibel Object Storage", "S3-compatible object storage support", "支持兼容 S3 的对象存储"],
    ["Pembayaran fleksibel sesuai kebutuhan", "Flexible payments to fit your needs", "灵活付款，满足您的需求"],
    ["Dilengkapi Managed Database & Apps Katalog", "Includes managed databases and an app catalog", "配备托管数据库和应用目录"],
    ["Unlimited Bandwidth Premium & Tanpa Kuota", "Unlimited premium bandwidth with no data caps", "高级无限带宽，不限流量"],
    ["Choose Package", "Choose Package", "选择套餐"],
    ["Cloud VPS eXtreme (NVMe)", "Cloud VPS eXtreme (NVMe)", "Cloud VPS eXtreme（NVMe）"],
    ["menawarkan kecepatan dan stabilitas terbaik, dilengkapi IOPS yang tinggi, high performance processor, dan dedicated resource. Dengan arsitektur CPU scalable dari Intel, AMD serta storage NVMe, layanan ini memberikan Powerful Performance yang efisien untuk kebutuhan bisnis Anda.", "delivers excellent speed and stability with high IOPS, high-performance processors, and dedicated resources. Scalable Intel and AMD CPUs with NVMe storage provide efficient performance for your business.", "提供卓越的速度与稳定性，具备高 IOPS、高性能处理器和专属资源。可扩展的 Intel、AMD CPU 与 NVMe 存储，为您的业务提供高效性能。"],
    ["Deploy Sekarang", "Deploy Now", "立即部署"],
    ["Deploy AI Instance", "Deploy AI Instance", "部署 AI 实例"],
    ["Infrastruktur Komputasi GPU Tesla untuk AI & Deep Learning", "Tesla GPU Computing Infrastructure for AI & Deep Learning", "面向 AI 与深度学习的 Tesla GPU 计算基础设施"],
    ["NVIDIA TESLA AI WORKLOAD", "NVIDIA TESLA AI WORKLOAD", "NVIDIA TESLA AI 工作负载"],
    ["AI Inference Starter", "AI Inference Starter", "AI 推理入门型"],
    ["Deep Learning Workstation", "Deep Learning Workstation", "深度学习工作站"],
    ["High-Density Cluster", "High-Density Cluster", "高密度集群"],
    ["Akselerasikan training model, fine-tuning LLM, inferensi real-time, dan render grafis 3D menggunakan GPU NVIDIA Tesla berstandar enterprise langsung dari private data center kami.", "Accelerate model training, LLM fine-tuning, real-time inference, and 3D rendering with enterprise-grade NVIDIA Tesla GPUs in our private data center.", "通过我们私有数据中心的企业级 NVIDIA Tesla GPU，加速模型训练、LLM 微调、实时推理和 3D 渲染。"],
    ["Inferensi LLM Cepat, Computer Vision API, PyTorch", "Fast LLM inference, computer vision APIs, and PyTorch", "快速 LLM 推理、计算机视觉 API 和 PyTorch"],
    ["Fine-Tuning Llama, Model Training, Stable Diffusion", "Llama fine-tuning, model training, and Stable Diffusion", "Llama 微调、模型训练和 Stable Diffusion"],
    ["Training Foundation Model & HPC Skala Besar", "Foundation model training and large-scale HPC", "基础模型训练与大规模 HPC"],
    ["Harga Layanan Cloud VPS ZeixonCloudHouse", "ZeixonCloudHouse Cloud VPS Pricing", "ZeixonCloudHouse Cloud VPS 价格"],
    ["Tentukan harga yang fleksibel sesuai spesifikasi dan kebutuhan bisnis Anda.", "Choose flexible pricing based on your specifications and business needs.", "根据您的规格和业务需求选择灵活的价格。"],
    ["Jumlah CPU", "Number of CPUs", "CPU 数量"],
    ["Kapasitas RAM", "RAM Capacity", "内存容量"],
    ["Kapasitas storage", "Storage Capacity", "存储容量"],
    ["Estimasi Tagihan", "Estimated Cost", "预估费用"],
    ["/bln", "/month", "/月"],
    ["/Bln", "/Month", "/月"],
    ["Rp 133 /Jam", "Rp 133 /Hour", "Rp 133 /小时"],
    ["/Jam", "/Hour", "/小时"],
    ["Core", "Core", "核"],
    ["DEPLOY NOW", "DEPLOY NOW", "立即部署"],
    ["Kembali", "Back", "返回"],
    ["PORTAL PELANGGAN", "CUSTOMER PORTAL", "客户门户"],
    ["Semua layanan Anda,", "All your services,", "您的所有服务，"],
    ["dalam satu", "in one", "尽在一个"],
    ["Client Area.", "Client Area.", "客户专区。"],
    ["Akses dan kelola layanan ZeixonCloudHouse dengan mudah — mulai dari layanan cloud, domain, hosting, pesanan, hingga informasi tagihan.", "Easily access and manage your ZeixonCloudHouse cloud, domain, hosting, orders, and billing services.", "轻松访问和管理 ZeixonCloudHouse 云服务、域名、主机、订单及账单信息。"],
    ["Kelola layanan", "Manage services", "管理服务"],
    ["Pantau pesanan", "Track orders", "跟踪订单"],
    ["Cek tagihan", "View invoices", "查看账单"],
    ["Sudah punya akun?", "Already have an account?", "已有账户？"],
    ["Masuk untuk mengakses dashboard pelanggan dan mengelola seluruh layanan Anda.", "Sign in to access your customer dashboard and manage all your services.", "登录客户控制面板并管理您的所有服务。"],
    ["Masuk ke akun", "Sign in", "登录账户"],
    ["Belum punya akun?", "Don't have an account?", "还没有账户？"],
    ["Pesan domain, hosting, dan kebutuhan cloud Anda melalui layanan ZeixonCloudHouse.", "Order domains, hosting, and cloud services from ZeixonCloudHouse.", "通过 ZeixonCloudHouse 订购域名、主机和云服务。"],
    ["Pesan domain & hosting", "Order domains & hosting", "订购域名和主机"],
    ["Butuh akses lainnya?", "Need something else?", "需要其他帮助？"],
    ["Buat akun baru", "Create an account", "创建账户"],
    ["Bantuan & Support", "Help & Support", "帮助与支持"],
    ["Masuk ke Client Area", "Sign in to Client Area", "登录客户专区"],
    ["Kelola layanan, domain, pesanan, dan tagihan ZeixonCloudHouse Anda.", "Manage your ZeixonCloudHouse services, domains, orders, and invoices.", "管理您的 ZeixonCloudHouse 服务、域名、订单和账单。"],
    ["Email", "Email", "电子邮箱"],
    ["Kata sandi", "Password", "密码"],
    ["Masukkan kata sandi", "Enter your password", "请输入密码"],
    ["Lupa kata sandi?", "Forgot password?", "忘记密码？"],
    ["Kembali ke Portal Pelanggan", "Back to Customer Portal", "返回客户门户"],
    ["BUAT AKUN", "CREATE ACCOUNT", "创建账户"],
    ["Mulai bersama kami", "Get started with us", "与我们一起开始"],
    ["Daftarkan akun untuk mengelola layanan ZeixonCloudHouse Anda.", "Create an account to manage your ZeixonCloudHouse services.", "注册账户以管理您的 ZeixonCloudHouse 服务。"],
    ["Nama lengkap", "Full name", "姓名"],
    ["Nama lengkap Anda", "Your full name", "您的姓名"],
    ["Minimal 8 karakter", "At least 8 characters", "至少 8 个字符"],
    ["Konfirmasi kata sandi", "Confirm password", "确认密码"],
    ["Ulangi kata sandi", "Re-enter your password", "再次输入密码"],
    ["Saya menyetujui syarat dan ketentuan yang berlaku.", "I agree to the applicable terms and conditions.", "我同意相关条款和条件。"],
    ["Buat akun", "Create account", "创建账户"],
    ["Masuk di sini", "Sign in here", "在此登录"],
    ["© 2026 PT Zeixon CloudHouse. Semua hak dilindungi.", "© 2026 PT Zeixon CloudHouse. All rights reserved.", "© 2026 PT Zeixon CloudHouse。保留所有权利。"],
    ["Infrastruktur cloud yang aman dan andal", "Secure and reliable cloud infrastructure", "安全可靠的云基础设施"],
    ["Buka menu", "Open menu", "打开菜单"],
    ["Buka Client Area", "Open Client Area", "打开客户专区"],
    ["Jumlah CPU", "Number of CPUs", "CPU 数量"],
    ["Kapasitas RAM", "RAM Capacity", "内存容量"],
    ["Kapasitas storage", "Storage Capacity", "存储容量"],
    ["nama@email.com", "name@email.com", "name@email.com"],
    ["Sedang membuat akun...", "Creating your account...", "正在创建账户..."],
    ["Tidak dapat terhubung ke server. Pastikan backend dan MongoDB sedang berjalan.", "Unable to connect to the server. Please make sure the backend and MongoDB are running.", "无法连接到服务器。请确认后端和 MongoDB 正在运行。"],
    ["Respons dari server tidak dapat dibaca.", "The server response could not be read.", "无法读取服务器响应。"],
    ["Pendaftaran gagal. Silakan coba lagi.", "Registration failed. Please try again.", "注册失败，请重试。"],
    ["Pendaftaran berhasil.", "Registration successful.", "注册成功。"],
    ["Terjadi kesalahan pada server.", "A server error occurred.", "服务器发生错误。"],
    ["Email sudah terdaftar.", "This email is already registered.", "该邮箱已注册。"],
    ["Nama, email, dan password wajib diisi.", "Name, email, and password are required.", "姓名、电子邮箱和密码为必填项。"],
    ["Nama maksimal 100 karakter.", "Name must be 100 characters or fewer.", "姓名最多可输入 100 个字符。"],
    ["Format email tidak valid.", "Invalid email format.", "电子邮箱格式无效。"],
    ["Password minimal 8 karakter dan maksimal 72 byte.", "Password must be at least 8 characters and no more than 72 bytes.", "密码至少需要 8 个字符，且最多为 72 字节。"],
    ["Konfirmasi kata sandi harus sama.", "Password confirmation must match.", "确认密码必须一致。"],
    ["Halaman pemesanan domain & hosting akan dibuka di sini.", "The domain and hosting order page will open here.", "域名和主机订购页面将在此处打开。"],
    ["Halaman bantuan akan dibuka di sini.", "The help page will open here.", "帮助页面将在此处打开。"],
    ["Fitur lupa password akan dibuka.", "The password recovery feature will open here.", "密码找回功能将在此处打开。"],
    ["Login berhasil diproses.", "Login request processed.", "登录请求已处理。"],
  ];

  translationEntries.forEach(([source, english, chinese]) => {
    translations.en.set(source, english);
    translations["zh-CN"].set(source, chinese);
  });

  function localizedText(source, language = languageSelect.value) {
    return language === "id"
      ? source
      : translations[language].get(source) || source;
  }

  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();
  const translatableAttributes = ["aria-label", "placeholder", "title"];
  const initialTitle = document.title;

  function localizeTextNode(node, language) {
    if (!originalTextNodes.has(node)) {
      originalTextNodes.set(node, node.nodeValue);
    }

    const original = originalTextNodes.get(node);
    if (language === "id") {
      node.nodeValue = original;
      return;
    }

    const source = original.replace(/\s+/g, " ").trim();
    const localized = translations[language].get(source);
    if (!localized) {
      node.nodeValue = original;
      return;
    }

    const leadingSpace = original.match(/^\s*/)[0];
    const trailingSpace = original.match(/\s*$/)[0];
    node.nodeValue = `${leadingSpace}${localized}${trailingSpace}`;
  }

  function applyLanguage(language) {
    const selectedLanguage = translations[language] ? language : "id";
    document.documentElement.lang = selectedLanguage;
    languageSelect.value = selectedLanguage;
    document.title =
      selectedLanguage === "id"
        ? initialTitle
        : translations[selectedLanguage].get(initialTitle) || initialTitle;

    languageToggle.querySelectorAll("[data-current-flag]").forEach((flag) => {
      const isCurrent = flag.dataset.currentFlag === selectedLanguage;
      flag.classList.toggle("is-current", isCurrent);
      flag.setAttribute("aria-hidden", String(!isCurrent));
    });
    languageOptions.forEach((option) => {
      const isSelected = option.dataset.languageChoice === selectedLanguage;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-checked", isSelected ? "true" : "false");
    });
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest("script, style, [aria-hidden='true']")) {
        continue;
      }
      localizeTextNode(node, selectedLanguage);
    }

    document.querySelectorAll("[aria-label], [placeholder], [title]").forEach((element) => {
      let originals = originalAttributes.get(element);
      if (!originals) {
        originals = new Map();
        originalAttributes.set(element, originals);
      }

      translatableAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!originals.has(attribute)) {
          originals.set(attribute, element.getAttribute(attribute));
        }
        const original = originals.get(attribute);
        element.setAttribute(
          attribute,
          selectedLanguage === "id"
            ? original
              : localizedText(original, selectedLanguage),
        );
      });
    });

    const languageNames = {
      id: "Bahasa Indonesia",
      en: "English",
      "zh-CN": "Bahasa China",
    };
    languageToggle.setAttribute(
      "aria-label",
      `${localizedText("Bahasa", selectedLanguage)}: ${localizedText(
        languageNames[selectedLanguage],
        selectedLanguage,
      )}`,
    );

    const registerStatusElement = document.getElementById("register-status");
    if (registerStatusElement && registerStatusElement.dataset.sourceMessage) {
      registerStatusElement.textContent = localizedText(
        registerStatusElement.dataset.sourceMessage,
        selectedLanguage,
      );
    }
  }

  let savedLanguage = "id";
  try {
    savedLanguage = localStorage.getItem("zeixon-language") || "id";
  } catch (error) {
    console.error("Tidak dapat membaca preferensi bahasa:", error);
  }
  applyLanguage(savedLanguage);
  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
    try {
      localStorage.setItem("zeixon-language", languageSelect.value);
    } catch (error) {
      console.error("Tidak dapat menyimpan preferensi bahasa:", error);
    }
    updatePrice();
  });

  languageToggle.addEventListener("click", () => {
    const isOpening = languageMenu.hidden;
    languageMenu.hidden = !isOpening;
    languageToggle.setAttribute("aria-expanded", String(isOpening));
    if (isOpening) {
      const selectedOption =
        languageMenu.querySelector('[aria-checked="true"]') || languageOptions[0];
      selectedOption.focus();
    }
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      languageSelect.value = option.dataset.languageChoice;
      languageSelect.dispatchEvent(new Event("change"));
      languageMenu.hidden = true;
      languageToggle.setAttribute("aria-expanded", "false");
      languageToggle.focus();
    });
  });

  function closeMenus() {
    document.querySelectorAll(".mega").forEach((menu) => {
      menu.hidden = true;
    });
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("is-open");
      const trigger = item.querySelector(".nav-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
    loginMenu.hidden = true;
    loginWrap.classList.remove("is-open");
    document.getElementById("login-btn").setAttribute("aria-expanded", "false");
    languageMenu.hidden = true;
    languageToggle.setAttribute("aria-expanded", "false");
  }

  function closeMobile() {
    navbar.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function showClient(visible) {
    client.hidden = !visible;
    document.body.classList.toggle("client-open", visible);
    if (!visible) showLogin(false);
  }

  function showLogin(on) {
    clientPortal.hidden = on;
    clientLogin.hidden = !on;
    clientRegister.hidden = true;
  }

  function showRegister() {
    clientPortal.hidden = true;
    clientLogin.hidden = true;
    clientRegister.hidden = false;
    registerStatus.hidden = true;
    registerStatus.textContent = "";
    delete registerStatus.dataset.sourceMessage;
  }

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".nav-item");
      const menu = document.getElementById(button.dataset.menu);
      const willOpen = menu.hidden;
      closeMenus();
      if (willOpen) {
        menu.hidden = false;
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll("[data-tabs]").forEach((group) => {
    const tabs = group.querySelectorAll("[data-tab]");
    const panels = group.querySelectorAll("[data-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const id = tab.dataset.tab;
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.panel !== id;
        });
      });
    });
  });

  document.getElementById("login-btn").addEventListener("click", () => {
    const willOpen = loginMenu.hidden;
    closeMenus();
    if (willOpen) {
      loginMenu.hidden = false;
      loginWrap.classList.add("is-open");
      document.getElementById("login-btn").setAttribute("aria-expanded", "true");
    }
  });

  function openClient() {
    closeMenus();
    closeMobile();
    if (location.hash !== "#client") location.hash = "client";
    else showClient(true);
  }

  document.querySelectorAll("[data-open-client]").forEach((el) => {
    el.addEventListener("click", openClient);
  });

  document.getElementById("client-close").addEventListener("click", () => {
    if (location.hash === "#client") history.back();
    else showClient(false);
  });

  document.getElementById("show-login").addEventListener("click", () => showLogin(true));
  document.getElementById("back-portal").addEventListener("click", () => showLogin(false));
  document.getElementById("signup-link").addEventListener("click", showRegister);
  document.getElementById("register-link").addEventListener("click", showRegister);
  document.getElementById("back-login").addEventListener("click", () => showLogin(true));
  document.getElementById("register-back-portal").addEventListener("click", () => showLogin(false));
  document.getElementById("order-btn").addEventListener("click", () => {
    alert(localizedText("Halaman pemesanan domain & hosting akan dibuka di sini."));
  });
  document.getElementById("help-link").addEventListener("click", () => {
    alert(localizedText("Halaman bantuan akan dibuka di sini."));
  });
  document.getElementById("forgot-btn").addEventListener("click", () => {
    alert(localizedText("Fitur lupa password akan dibuka."));
  });

  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert(localizedText("Login berhasil diproses."));
  });

  const registerForm = document.getElementById("register-form");
  const registerPassword = document.getElementById("register-password");
  const registerPasswordConfirm = document.getElementById("register-password-confirm");
  const registerStatus = document.getElementById("register-status");

  function validatePasswordMatch() {
    registerPasswordConfirm.setCustomValidity(
      registerPassword.value === registerPasswordConfirm.value
        ? ""
        : localizedText("Konfirmasi kata sandi harus sama."),
    );
  }

  function showRegisterStatus(message, isError = false) {
    registerStatus.hidden = false;
    registerStatus.dataset.sourceMessage = message;
    registerStatus.textContent = localizedText(message);
    registerStatus.classList.toggle("is-error", isError);
  }

  registerPassword.addEventListener("input", validatePasswordMatch);
  registerPasswordConfirm.addEventListener("input", validatePasswordMatch);
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    validatePasswordMatch();

    if (!registerForm.reportValidity()) return;

    const submitButton = registerForm.querySelector('button[type="submit"]');
    const formData = new FormData(registerForm);
    submitButton.disabled = true;
    showRegisterStatus("Sedang membuat akun...");

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
    } catch (error) {
      console.error("Gagal menghubungi backend registrasi:", error);
      showRegisterStatus(
        "Tidak dapat terhubung ke server. Pastikan backend dan MongoDB sedang berjalan.",
        true,
      );
      submitButton.disabled = false;
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Respons backend registrasi tidak valid:", error);
      showRegisterStatus("Respons dari server tidak dapat dibaca.", true);
      submitButton.disabled = false;
      return;
    }

    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      result.status !== "success"
    ) {
      showRegisterStatus(
        result && typeof result.message === "string"
          ? result.message
          : "Pendaftaran gagal. Silakan coba lagi.",
        true,
      );
      submitButton.disabled = false;
      return;
    }

    registerForm.reset();
    registerPasswordConfirm.setCustomValidity("");
    submitButton.disabled = false;
    showLogin(true);
  });

  document.querySelectorAll(".mega-card").forEach((card) => {
    card.addEventListener("click", () => {
      closeMenus();
      closeMobile();
    });
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenus();
      closeMobile();
    });
  });

  navToggle.addEventListener("click", () => {
    const open = !navbar.classList.contains("is-open");
    navbar.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) closeMenus();
  });

  document.addEventListener("click", (event) => {
    if (
      event.target.closest(
        ".nav-item, .login-wrap, .nav-toggle, .mega, .language-picker",
      )
    ) {
      return;
    }
    closeMenus();
    if (!event.target.closest(".navbar")) closeMobile();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const languageMenuWasOpen = !languageMenu.hidden;
      closeMenus();
      closeMobile();
      if (languageMenuWasOpen) languageToggle.focus();
    }
  });

  window.addEventListener("hashchange", () => {
    showClient(location.hash === "#client");
  });

  if (location.hash === "#client") showClient(true);

  const cpu = document.getElementById("cpu");
  const ram = document.getElementById("ram");
  const storage = document.getElementById("storage");
  const cpuLabel = document.getElementById("cpu-label");
  const ramLabel = document.getElementById("ram-label");
  const storageLabel = document.getElementById("storage-label");
  const monthLabel = document.getElementById("month-price");
  const hourLabel = document.getElementById("hour-price");

  function rupiah(value) {
    return value.toLocaleString("id-ID");
  }

  function updatePrice() {
    const cpuValue = Number(cpu.value);
    const ramValue = Number(ram.value);
    const storageValue = Number(storage.value);
    const monthly = cpuValue * 25000 + ramValue * 18000 + storageValue * 500;
    const hourly = Math.round(monthly / 720);
    cpuLabel.textContent = cpuValue + " " + localizedText("Core");
    ramLabel.textContent = ramValue + " GB";
    storageLabel.textContent = storageValue + " GB";
    monthLabel.textContent = "Rp " + rupiah(monthly);
    hourLabel.textContent =
      "Rp " + rupiah(hourly) + " " + localizedText("/Jam");
  }

  [cpu, ram, storage].forEach((input) => {
    input.addEventListener("input", updatePrice);
  });
  updatePrice();

  document.getElementById("brand").addEventListener("click", (event) => {
    if (location.hash === "#client") {
      event.preventDefault();
      history.back();
    }
    closeMenus();
    closeMobile();
  });
})();
