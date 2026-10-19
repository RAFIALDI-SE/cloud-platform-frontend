(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const loginWrap = document.getElementById("login-wrap");
  const loginMenu = document.getElementById("login-menu");
  const client = document.getElementById("client");
  const clientPortal = document.getElementById("client-portal");
  const clientLogin = document.getElementById("client-login");
  const clientHome = document.getElementById("client-home");
  const clientRegister = document.getElementById("client-register");
  const API_BASE_URL = ["localhost", "127.0.0.1"].includes(location.hostname)
    ? `http://${location.hostname}:3000`
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
    ["Email atau kata sandi salah.", "Incorrect email or password.", "电子邮箱或密码错误。"],
    ["Masukkan email dan kata sandi yang valid.", "Enter a valid email and password.", "请输入有效的电子邮箱和密码。"],
    ["Sedang masuk...", "Signing in...", "正在登录..."],
    ["Gagal masuk. Silakan coba lagi.", "Sign-in failed. Please try again.", "登录失败，请重试。"],
    ["Tidak dapat menghubungi server. Coba lagi.", "Unable to reach the server. Please try again.", "无法连接服务器，请重试。"],
    ["Tidak dapat membaca respons server.", "Could not read the server response.", "无法读取服务器响应。"],
    ["Logout", "Log out", "退出登录"],
    ["Logout gagal. Coba lagi.", "Log out failed. Please try again.", "退出登录失败，请重试。"],
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
    ["Informasi pribadi", "Personal information", "个人信息"],
    ["Satu portal untuk hosting, VPS, dan domain Anda.", "One portal for your hosting, VPS, and domains.", "一个门户，管理您的主机、VPS 和域名。"],
    ["Bayar invoice dengan QRIS, virtual account, atau kartu tersimpan", "Pay invoices with QRIS, virtual accounts, or a saved card", "使用 QRIS、虚拟账户或已保存的银行卡支付账单"],
    ["Kelola hosting, VPS, domain, dan DNS dari satu tempat", "Manage hosting, VPS, domains, and DNS in one place", "在一个地方管理主机、VPS、域名和 DNS"],
    ["Pantau tagihan dan perpanjangan sebelum jatuh tempo", "Track invoices and renewals before they are due", "在账单和续费到期前及时查看"],
    ["Bersertifikat ISO 9001 & ISO/IEC 27001", "ISO 9001 & ISO/IEC 27001 certified", "通过 ISO 9001 和 ISO/IEC 27001 认证"],
    ["Nama depan", "First name", "名字"],
    ["Nama belakang", "Last name", "姓氏"],
    ["Nomor telepon / WhatsApp", "Phone number / WhatsApp", "电话号码 / WhatsApp"],
    ["Alamat penagihan", "Billing address", "账单地址"],
    ["Dipakai untuk invoice dan sebagai data pemilik saat mendaftarkan domain.", "Used for invoices and as the registrant details when registering a domain.", "用于账单以及注册域名时的注册人信息。"],
    ["Nama perusahaan (isi nama Anda bila perorangan)", "Company name (enter your name if registering as an individual)", "公司名称（个人注册请填写姓名）"],
    ["Alamat", "Address", "地址"],
    ["Alamat 2 (opsional)", "Address line 2 (optional)", "地址 2（可选）"],
    ["Kota", "City", "城市"],
    ["Provinsi", "Province", "省 / 州"],
    ["Kode pos", "Postal code", "邮政编码"],
    ["Negara", "Country", "国家"],
    ["Sandi (min. 10 karakter)", "Password (at least 10 characters)", "密码（至少 10 个字符）"],
    ["Mata uang", "Currency", "货币"],
    ["Sektor Usaha", "Industry", "行业"],
    ["Dari mana Anda mengetahui kami?", "How did you hear about us?", "您是如何了解到我们的？"],
    ["Lainnya", "Other", "其他"],
    ["Perorangan", "Individual", "个人"],
    ["Teknologi / IT", "Technology / IT", "科技 / IT"],
    ["Keuangan", "Finance", "金融"],
    ["Ritel / E-commerce", "Retail / E-commerce", "零售 / 电子商务"],
    ["Pendidikan", "Education", "教育"],
    ["Kesehatan", "Healthcare", "医疗健康"],
    ["Manufaktur", "Manufacturing", "制造业"],
    ["Pemerintahan", "Government", "政府"],
    ["Mesin pencari", "Search engine", "搜索引擎"],
    ["Media sosial", "Social media", "社交媒体"],
    ["Rekomendasi", "Referral", "推荐"],
    ["Iklan", "Advertisement", "广告"],
    ["Acara / komunitas", "Event / community", "活动 / 社区"],
    ["— Pilih sektor usaha —", "— Select an industry —", "— 请选择行业 —"],
    ["Daftar", "Register", "注册"],
    ["Data pemilik akun dipakai untuk invoice dan sebagai data pemilik domain di registrar.", "Account owner details are used for invoices and as the domain registrant details.", "账户所有者信息将用于账单和域名注册人资料。"],
    ["Indonesia", "Indonesia", "印度尼西亚"],
    ["Malaysia", "Malaysia", "马来西亚"],
    ["Singapore", "Singapore", "新加坡"],
    ["United States", "United States", "美国"],
    ["United Kingdom", "United Kingdom", "英国"],
    ["IDR (Rupiah)", "IDR (Indonesian Rupiah)", "IDR（印尼卢比）"],
    ["USD (US Dollar)", "USD (US Dollar)", "USD（美元）"],
    ["SGD (Singapore Dollar)", "SGD (Singapore Dollar)", "SGD（新加坡元）"],
    ["MYR (Malaysian Ringgit)", "MYR (Malaysian Ringgit)", "MYR（马来西亚林吉特）"],
    ["GBP (British Pound)", "GBP (British Pound)", "GBP（英镑）"],
    ["Konfigurasi verifikasi belum tersedia. Hubungi administrator.", "Verification is not configured yet. Please contact the administrator.", "验证功能尚未配置，请联系管理员。"],
    ["Memuat verifikasi keamanan...", "Loading security verification...", "正在加载安全验证..."],
    ["Verifikasi keamanan gagal dimuat. Muat ulang halaman dan coba lagi.", "Security verification failed to load. Reload the page and try again.", "安全验证加载失败，请刷新页面后重试。"],
    ["Selesaikan verifikasi keamanan terlebih dahulu.", "Complete the security verification first.", "请先完成安全验证。"],
    ["Selesaikan verifikasi keamanan sebelum mendaftar.", "Complete the security verification before registering.", "注册前请先完成安全验证。"],
    ["Lengkapi semua field wajib pada formulir registrasi.", "Complete all required registration fields.", "请填写所有必填注册信息。"],
    ["Nama depan dan belakang maksimal 100 karakter masing-masing.", "First and last names must each be 100 characters or fewer.", "名字和姓氏各不能超过 100 个字符。"],
    ["Format nomor telepon tidak valid.", "Invalid phone number format.", "电话号码格式无效。"],
    ["Salah satu field alamat melebihi batas panjang.", "One of the address fields exceeds the maximum length.", "其中一个地址字段超出长度限制。"],
    ["Pilihan negara, mata uang, sektor, atau sumber tidak valid.", "Invalid country, currency, industry, or referral source.", "国家、货币、行业或来源选项无效。"],
    ["Verifikasi keamanan belum dikonfigurasi di server.", "Security verification is not configured on the server.", "服务器尚未配置安全验证。"],
    ["Layanan verifikasi keamanan sedang bermasalah. Coba lagi.", "The security verification service is unavailable. Please try again.", "安全验证服务暂不可用，请重试。"],
    ["Verifikasi keamanan gagal atau kedaluwarsa. Coba lagi.", "Security verification failed or expired. Please try again.", "安全验证失败或已过期，请重试。"],
    ["Tidak dapat menghubungi layanan verifikasi keamanan.", "Could not contact the security verification service.", "无法连接安全验证服务。"],
    ["Sandi minimal 10 karakter dan maksimal 72 byte.", "Password must be at least 10 characters and no more than 72 bytes.", "密码至少需要 10 个字符，且最多为 72 字节。"],
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
    ["login-status", "logout-status"].forEach((id) => {
      const status = document.getElementById(id);
      if (status && status.dataset.sourceMessage) {
        status.textContent = localizedText(
          status.dataset.sourceMessage,
          selectedLanguage,
        );
      }
    });
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

  let sessionCheckSequence = 0;

  function setLoginStatus(message, isError = false) {
    const status = document.getElementById("login-status");
    status.hidden = false;
    status.dataset.sourceMessage = message;
    status.textContent = localizedText(message);
    status.classList.toggle("is-error", isError);
  }

  function setLogoutStatus(message) {
    const status = document.getElementById("logout-status");
    status.hidden = false;
    status.dataset.sourceMessage = message;
    status.textContent = localizedText(message);
    status.classList.add("is-error");
  }

  function showClient(visible) {
    client.hidden = !visible;
    document.body.classList.toggle("client-open", visible);
    if (!visible) {
      showLogin(false);
      return;
    }

    showLogin(false);
    const checkSequence = ++sessionCheckSequence;
    fetch(`${API_BASE_URL}/api/session`, { credentials: "include" })
      .then(async (response) => {
        let result;
        try {
          result = await response.json();
        } catch (error) {
          console.error("Respons pemeriksaan sesi tidak valid:", error);
          throw new Error("Respons sesi tidak dapat dibaca.");
        }

        if (!response.ok || result.status !== "success") {
          throw new Error(
            typeof result.message === "string"
              ? result.message
              : "Gagal memeriksa sesi pengguna.",
          );
        }
        return result;
      })
      .then((result) => {
        if (
          checkSequence !== sessionCheckSequence ||
          client.hidden ||
          !result.authenticated
        ) {
          return;
        }
        showHome();
      })
      .catch((error) => {
        if (checkSequence === sessionCheckSequence) {
          console.error("Gagal memeriksa sesi pengguna:", error);
        }
      });
  }

  function showLogin(on) {
    sessionCheckSequence += 1;
    clientPortal.hidden = on;
    clientLogin.hidden = !on;
    clientHome.hidden = true;
    clientRegister.hidden = true;
    const loginStatus = document.getElementById("login-status");
    loginStatus.hidden = true;
    loginStatus.textContent = "";
    delete loginStatus.dataset.sourceMessage;
    const logoutStatus = document.getElementById("logout-status");
    logoutStatus.hidden = true;
    logoutStatus.textContent = "";
    delete logoutStatus.dataset.sourceMessage;
  }

  function showHome() {
    sessionCheckSequence += 1;
    clientPortal.hidden = true;
    clientLogin.hidden = true;
    clientHome.hidden = false;
    clientRegister.hidden = true;
    const logoutStatus = document.getElementById("logout-status");
    logoutStatus.hidden = true;
    logoutStatus.textContent = "";
    delete logoutStatus.dataset.sourceMessage;
  }

  function showRegister() {
    sessionCheckSequence += 1;
    clientPortal.hidden = true;
    clientLogin.hidden = true;
    clientHome.hidden = true;
    clientRegister.hidden = false;
    registerStatus.hidden = true;
    registerStatus.textContent = "";
    delete registerStatus.dataset.sourceMessage;
    initializeTurnstile();
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

  const loginForm = document.getElementById("login-form");
  const loginSubmit = loginForm.querySelector('button[type="submit"]');

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!loginForm.reportValidity()) return;

    const formData = new FormData(loginForm);
    loginSubmit.disabled = true;
    setLoginStatus("Sedang masuk...");

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
    } catch (error) {
      console.error("Gagal menghubungi backend login:", error);
      setLoginStatus("Tidak dapat menghubungi server. Coba lagi.", true);
      loginSubmit.disabled = false;
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Respons backend login tidak valid:", error);
      setLoginStatus("Tidak dapat membaca respons server.", true);
      loginSubmit.disabled = false;
      return;
    }

    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      result.status !== "success" ||
      result.authenticated !== true
    ) {
      setLoginStatus(
        result && typeof result.message === "string"
          ? result.message
          : "Gagal masuk. Silakan coba lagi.",
        true,
      );
      loginSubmit.disabled = false;
      return;
    }

    loginForm.reset();
    showHome();
    loginSubmit.disabled = false;
  });

  const logoutButton = document.getElementById("logout-btn");
  const logoutStatus = document.getElementById("logout-status");

  logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;
    logoutStatus.hidden = true;
    logoutStatus.textContent = "";
    delete logoutStatus.dataset.sourceMessage;

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Gagal menghubungi backend untuk logout:", error);
      setLogoutStatus("Logout gagal. Coba lagi.");
      logoutButton.disabled = false;
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Respons backend logout tidak valid:", error);
      setLogoutStatus("Logout gagal. Coba lagi.");
      logoutButton.disabled = false;
      return;
    }

    if (!response.ok || !result || result.status !== "success") {
      console.error("Backend menolak logout:", result);
      setLogoutStatus("Logout gagal. Coba lagi.");
      logoutButton.disabled = false;
      return;
    }

    showLogin(true);
    logoutButton.disabled = false;
  });

  const registerForm = document.getElementById("register-form");
  const registerPassword = document.getElementById("register-password");
  const registerStatus = document.getElementById("register-status");
  const registerSubmit = document.getElementById("register-submit");
  const turnstileNote = document.getElementById("turnstile-note");
  const turnstileSiteKey = document
    .querySelector('meta[name="turnstile-site-key"]')
    .content.trim();
  let turnstileWidgetId = null;
  let turnstileToken = "";
  let turnstileScriptLoading = false;

  function setTurnstileNote(message) {
    turnstileNote.textContent = localizedText(message);
    turnstileNote.dataset.sourceMessage = message;
  }

  function resetTurnstile() {
    turnstileToken = "";
    registerSubmit.disabled = true;
    if (turnstileWidgetId !== null && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  function initializeTurnstile() {
    if (!turnstileSiteKey) {
      registerSubmit.disabled = true;
      setTurnstileNote(
        "Konfigurasi verifikasi belum tersedia. Hubungi administrator.",
      );
      return;
    }

    if (turnstileWidgetId !== null || turnstileScriptLoading) return;
    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    turnstileScriptLoading = true;
    registerSubmit.disabled = true;
    setTurnstileNote("Memuat verifikasi keamanan...");

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      turnstileScriptLoading = false;
      renderTurnstile();
    });
    script.addEventListener("error", () => {
      turnstileScriptLoading = false;
      registerSubmit.disabled = true;
      setTurnstileNote(
        "Verifikasi keamanan gagal dimuat. Muat ulang halaman dan coba lagi.",
      );
    });
    document.head.append(script);
  }

  function renderTurnstile() {
    if (!window.turnstile || turnstileWidgetId !== null) return;

    try {
      turnstileWidgetId = window.turnstile.render("#turnstile-widget", {
        sitekey: turnstileSiteKey,
        callback(token) {
          turnstileToken = token;
          registerSubmit.disabled = false;
          turnstileNote.textContent = "";
          delete turnstileNote.dataset.sourceMessage;
        },
        "expired-callback"() {
          resetTurnstile();
          setTurnstileNote(
            "Verifikasi keamanan gagal atau kedaluwarsa. Coba lagi.",
          );
        },
        "error-callback"() {
          resetTurnstile();
          setTurnstileNote(
            "Verifikasi keamanan gagal dimuat. Muat ulang halaman dan coba lagi.",
          );
        },
        language:
          languageSelect.value === "zh-CN" ? "zh-cn" : languageSelect.value,
        theme: "light",
      });
    } catch (error) {
      console.error("Tidak dapat menampilkan widget Turnstile:", error);
      registerSubmit.disabled = true;
      setTurnstileNote(
        "Verifikasi keamanan gagal dimuat. Muat ulang halaman dan coba lagi.",
      );
    }
  }

  function showRegisterStatus(message, isError = false) {
    registerStatus.hidden = false;
    registerStatus.dataset.sourceMessage = message;
    registerStatus.textContent = localizedText(message);
    registerStatus.classList.toggle("is-error", isError);
  }

  languageSelect.addEventListener("change", () => {
    if (turnstileWidgetId !== null && window.turnstile) {
      window.turnstile.remove(turnstileWidgetId);
      turnstileWidgetId = null;
      turnstileToken = "";
      registerSubmit.disabled = true;
      renderTurnstile();
    }
    if (turnstileNote.dataset.sourceMessage) {
      setTurnstileNote(turnstileNote.dataset.sourceMessage);
    }
  });

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!registerForm.reportValidity()) return;

    if (!turnstileToken) {
      setTurnstileNote("Selesaikan verifikasi keamanan sebelum mendaftar.");
      return;
    }

    const formData = new FormData(registerForm);
    registerSubmit.disabled = true;
    showRegisterStatus("Sedang membuat akun...");

    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          companyName: formData.get("companyName"),
          address1: formData.get("address1"),
          address2: formData.get("address2"),
          city: formData.get("city"),
          province: formData.get("province"),
          postalCode: formData.get("postalCode"),
          country: formData.get("country"),
          currency: formData.get("currency"),
          industry: formData.get("industry"),
          referralSource: formData.get("referralSource"),
          password: formData.get("password"),
          turnstileToken,
        }),
      });
    } catch (error) {
      console.error("Gagal menghubungi backend registrasi:", error);
      showRegisterStatus(
        "Tidak dapat terhubung ke server. Pastikan backend dan MongoDB sedang berjalan.",
        true,
      );
      resetTurnstile();
      return;
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Respons backend registrasi tidak valid:", error);
      showRegisterStatus("Respons dari server tidak dapat dibaca.", true);
      resetTurnstile();
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
      resetTurnstile();
      return;
    }

    registerForm.reset();
    resetTurnstile();
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
